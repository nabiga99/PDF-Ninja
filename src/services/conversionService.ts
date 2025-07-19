import axios from 'axios';
import { CLOUDCONVERT_CONFIG } from '../config/cloudconvert';

export interface ConversionProgress {
  stage: 'uploading' | 'processing' | 'downloading' | 'complete' | 'error';
  message: string;
  percentage: number;
}

class ConversionService {
  private apiClient = axios.create({
    baseURL: CLOUDCONVERT_CONFIG.BASE_URL,
    headers: {
      'Authorization': `Bearer ${CLOUDCONVERT_CONFIG.API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  async convertFile(
    file: File, 
    fromFormat: string, 
    toFormat: string,
    onProgress?: (progress: ConversionProgress) => void
  ): Promise<Blob> {
    try {
      // Step 1: Create conversion job
      onProgress?.({ stage: 'uploading', message: 'Creating conversion job...', percentage: 10 });
      
      const jobResponse = await this.apiClient.post('/jobs', {
        tasks: {
          'import-file': {
            operation: 'import/upload'
          },
          'convert-file': {
            operation: 'convert',
            input: 'import-file',
            input_format: fromFormat,
            output_format: toFormat,
            options: {
              optimize: true,
              quality: 'good'
            }
          },
          'export-file': {
            operation: 'export/url',
            input: 'convert-file'
          }
        }
      });

      const jobId = jobResponse.data.data.id;

      // Step 2: Get upload details and upload file
      onProgress?.({ stage: 'uploading', message: 'Uploading file...', percentage: 25 });
      
      const jobDetails = await this.apiClient.get(`/jobs/${jobId}`);
      const uploadTask = Object.values(jobDetails.data.data.tasks).find(
        (task: any) => task.operation === 'import/upload'
      ) as any;

      const formData = new FormData();
      Object.entries(uploadTask.result.form.parameters).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append('file', file);

      await axios.post(uploadTask.result.form.url, formData);

      // Step 3: Poll for conversion completion
      onProgress?.({ stage: 'processing', message: 'Converting file...', percentage: 50 });
      
      let jobStatus = await this.apiClient.get(`/jobs/${jobId}`);
      
      while (jobStatus.data.data.status === 'waiting' || jobStatus.data.data.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        jobStatus = await this.apiClient.get(`/jobs/${jobId}`);
        onProgress?.({ stage: 'processing', message: 'Converting file...', percentage: 75 });
      }

      if (jobStatus.data.data.status === 'error') {
        throw new Error('Conversion failed');
      }

      // Step 4: Download converted file
      onProgress?.({ stage: 'downloading', message: 'Downloading result...', percentage: 90 });
      
      const exportTask = Object.values(jobStatus.data.data.tasks).find(
        (task: any) => task.operation === 'export/url'
      ) as any;

      const downloadUrl = exportTask.result.files[0].url;
      const downloadResponse = await axios.get(downloadUrl, { responseType: 'blob' });
      
      onProgress?.({ stage: 'complete', message: 'Conversion complete!', percentage: 100 });
      
      return new Blob([downloadResponse.data]);

    } catch (error) {
      onProgress?.({ stage: 'error', message: 'Conversion failed', percentage: 0 });
      if (axios.isAxiosError(error)) {
        console.error('Request config:', error.config);
        console.error('Request headers:', error.config?.headers);
      }
      console.error('Conversion error:', error);
      throw error;
    }
  }
}

export const conversionService = new ConversionService();
