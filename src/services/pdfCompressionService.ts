import axios from 'axios';
import { CLOUDCONVERT_CONFIG } from '../config/cloudconvert';
import { ConversionProgress } from './conversionService';

export interface CompressionOptions {
  quality: 'good' | 'better' | 'best';
  imageQuality: 'low' | 'medium' | 'high';
  removeMetadata?: boolean;
  compressImages?: boolean;
}

class PDFCompressionService {
  private apiClient = axios.create({
    baseURL: CLOUDCONVERT_CONFIG.BASE_URL,
    headers: {
      'Authorization': `Bearer ${CLOUDCONVERT_CONFIG.API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  async compressPDF(
    file: File, 
    options: CompressionOptions,
    onProgress?: (progress: ConversionProgress) => void
  ): Promise<Blob> {
    try {
      onProgress?.({ stage: 'uploading', message: 'Creating compression job...', percentage: 10 });

      const jobResponse = await this.apiClient.post('/jobs', {
        tasks: {
          'import-file': {
            operation: 'import/upload'
          },
          'optimize-pdf': {
            operation: 'optimize',
            input: 'import-file',
            input_format: 'pdf',
            output_format: 'pdf',
            options: {
              profile: options.quality,
              image_quality: this.mapImageQuality(options.imageQuality),
              compress_images: options.compressImages ?? true,
              remove_metadata: options.removeMetadata ?? true,
              remove_annotations: false,
              linearize: true
            }
          },
          'export-file': {
            operation: 'export/url',
            input: 'optimize-pdf'
          }
        }
      });

      const jobId = jobResponse.data.data.id;

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

      onProgress?.({ stage: 'processing', message: 'Compressing file...', percentage: 50 });

      let jobStatus = await this.apiClient.get(`/jobs/${jobId}`);
      
      while (jobStatus.data.data.status === 'waiting' || jobStatus.data.data.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        jobStatus = await this.apiClient.get(`/jobs/${jobId}`);
        const processPercentage = jobStatus.data.data.percent || 75;
        onProgress?.({ stage: 'processing', message: 'Compressing file...', percentage: 50 + (processPercentage / 2) });
      }

      if (jobStatus.data.data.status === 'error') {
        const errorDetails = jobStatus.data.data.tasks.find((t:any) => t.status === 'error');
        throw new Error(`Compression failed: ${errorDetails?.message || 'Unknown error'}`);
      }

      onProgress?.({ stage: 'downloading', message: 'Downloading result...', percentage: 95 });

      const exportTask = Object.values(jobStatus.data.data.tasks).find(
        (task: any) => task.operation === 'export/url'
      ) as any;

      const downloadUrl = exportTask.result.files[0].url;
      const downloadResponse = await axios.get(downloadUrl, { responseType: 'blob' });
      
      onProgress?.({ stage: 'complete', message: 'Compression complete!', percentage: 100 });
      
      return new Blob([downloadResponse.data], { type: 'application/pdf' });

    } catch (error) {
      onProgress?.({ stage: 'error', message: 'Compression failed', percentage: 0 });
      console.error('Compression error:', error);
      throw error;
    }
  }

  private mapImageQuality(quality: 'low' | 'medium' | 'high'): number {
    const qualityMap = { low: 50, medium: 75, high: 90 };
    return qualityMap[quality] || 75;
  }
}

export const pdfCompressionService = new PDFCompressionService();
