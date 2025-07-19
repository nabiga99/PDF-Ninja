import { useState } from 'react';
import { conversionService, ConversionProgress } from '../services/conversionService';

interface ConversionState {
  isConverting: boolean;
  progress: ConversionProgress | null;
  error: string | null;
  convertedFile: Blob | null;
}

export const useDocumentConversion = () => {
  const [state, setState] = useState<ConversionState>({
    isConverting: false,
    progress: null,
    error: null,
    convertedFile: null
  });

  const convertFile = async (file: File, fromFormat: string, toFormat: string) => {
    setState({ isConverting: true, progress: null, error: null, convertedFile: null });

    try {
      const result = await conversionService.convertFile(
        file,
        fromFormat,
        toFormat,
        (progress) => setState(prev => ({ ...prev, progress }))
      );

      setState(prev => ({ 
        ...prev, 
        isConverting: false, 
        convertedFile: result,
        error: null 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isConverting: false, 
        error: error instanceof Error ? error.message : 'Conversion failed',
        convertedFile: null 
      }));
    }
  };

  const reset = () => {
    setState({ isConverting: false, progress: null, error: null, convertedFile: null });
  };

  const downloadFile = (filename: string) => {
    if (!state.convertedFile) return;
    
    const url = URL.createObjectURL(state.convertedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    ...state,
    convertFile,
    reset,
    downloadFile
  };
};
