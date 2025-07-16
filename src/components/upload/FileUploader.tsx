
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PDFFile } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { getPageCount } from '../../utils/pdfUtils';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const FileUploader = () => {
  const { addUploadedFile, setError } = useAppStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map((file) => {
          if (file.file.size > MAX_FILE_SIZE) {
            return `${file.file.name}: File too large (max 100MB)`;
          }
          if (!file.file.type.includes('pdf')) {
            return `${file.file.name}: Only PDF files are supported`;
          }
          return `${file.file.name}: Invalid file`;
        });
        setError(errors.join(', '));
        return;
      }

      // Process accepted files
      for (const file of acceptedFiles) {
        try {
          const pageCount = await getPageCount(file);
          
          const pdfFile: PDFFile = {
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            file,
            pageCount,
            processingStatus: 'idle',
            progress: 0,
          };
          
          addUploadedFile(pdfFile);
        } catch (error) {
          console.error('Error processing file:', error);
          setError(`Error processing ${file.name}`);
        }
      }

      setError(null);
    },
    [addUploadedFile, setError]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  return (
    <Card className="shadow-card">
      <CardContent className="p-8">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragActive && !isDragReject
                ? 'border-primary bg-primary/5 scale-105'
                : isDragReject
                ? 'border-destructive bg-destructive/5'
                : 'border-border hover:border-primary hover:bg-primary/5'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-4">
            {isDragReject ? (
              <AlertCircle className="h-16 w-16 text-destructive" />
            ) : (
              <div className="relative">
                <Upload className={`h-16 w-16 transition-colors ${
                  isDragActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <FileText className="h-8 w-8 text-primary absolute -bottom-2 -right-2 bg-background rounded-full p-1" />
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {isDragActive
                  ? isDragReject
                    ? 'Invalid file type'
                    : 'Drop your PDF files here'
                  : 'Upload PDF Files'
                }
              </h3>
              
              <p className="text-muted-foreground">
                {isDragReject
                  ? 'Only PDF files up to 100MB are supported'
                  : 'Drag and drop PDF files here, or click to browse'
                }
              </p>
              
              <p className="text-sm text-muted-foreground">
                Maximum file size: 100MB • Supports multiple files
              </p>
            </div>
            
            <Button variant="outline" size="lg" className="mt-4">
              <FileText className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
