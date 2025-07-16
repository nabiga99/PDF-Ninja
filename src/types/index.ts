
export interface PDFFile {
  id: string;
  name: string;
  size: number;
  file: File;
  pageCount?: number;
  processingStatus?: 'idle' | 'processing' | 'completed' | 'error';
  progress?: number;
}

export interface ProcessingOptions {
  compressionLevel?: 'light' | 'medium' | 'heavy';
  outputFormat?: 'pdf' | 'text' | 'docx';
  selectedPages?: number[];
  pageRange?: string;
  password?: string;
  watermarkText?: string;
  watermarkPosition?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  watermarkOpacity?: number;
  signatureData?: string;
  signaturePosition?: { x: number; y: number };
  redactAreas?: { x: number; y: number; width: number; height: number; page: number }[];
}

export interface ProcessingResult {
  file?: Blob;
  text?: string;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: number;
  confidence?: number;
  isPasswordProtected?: boolean;
  isUnlocked?: boolean;
  isSigned?: boolean;
  hasWatermark?: boolean;
  isRedacted?: boolean;
  isUneditable?: boolean;
}

export type ToolType = 'compress' | 'extract' | 'delete' | 'esign' | 'unlock' | 'protect' | 'redact' | 'uneditable' | 'watermark' | 'merge';

export interface AppState {
  currentTool: ToolType;
  uploadedFiles: PDFFile[];
  selectedFileId: string | null;
  processingOptions: ProcessingOptions;
  processingResult: ProcessingResult | null;
  isProcessing: boolean;
  error: string | null;
}
