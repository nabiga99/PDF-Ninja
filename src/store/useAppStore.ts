import { create } from 'zustand';
import { AppState, ToolType, PDFFile, ProcessingOptions, ProcessingResult } from '../types';

interface AppStore extends AppState {
  // Actions
  setCurrentTool: (tool: ToolType) => void;
  addUploadedFile: (file: PDFFile) => void;
  removeUploadedFile: (fileId: string) => void;
  selectFile: (fileId: string | null) => void;
  updateProcessingOptions: (options: Partial<ProcessingOptions>) => void;
  setProcessingResult: (result: ProcessingResult | null) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  updateFileProgress: (fileId: string, progress: number) => void;
  clearAll: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  currentTool: 'compress',
  uploadedFiles: [],
  selectedFileId: null,
  processingOptions: {},
  processingResult: null,
  isProcessing: false,
  error: null,

  // Actions
  setCurrentTool: (tool) => set({ currentTool: tool, error: null }),
  
  addUploadedFile: (file) => set((state) => ({
    uploadedFiles: [...state.uploadedFiles, file],
    selectedFileId: state.selectedFileId || file.id,
  })),
  
  removeUploadedFile: (fileId) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileId),
    selectedFileId: state.selectedFileId === fileId ? null : state.selectedFileId,
  })),
  
  selectFile: (fileId) => set({ selectedFileId: fileId }),
  
  updateProcessingOptions: (options) => set((state) => ({
    processingOptions: { ...state.processingOptions, ...options },
  })),
  
  setProcessingResult: (result) => set({ processingResult: result }),
  
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  
  setError: (error) => set({ error }),
  
  updateFileProgress: (fileId, progress) => set((state) => ({
    uploadedFiles: state.uploadedFiles.map((file) =>
      file.id === fileId ? { ...file, progress } : file
    ),
  })),
  
  clearAll: () => set({
    uploadedFiles: [],
    selectedFileId: null,
    processingOptions: {},
    processingResult: null,
    isProcessing: false,
    error: null,
  }),
}));