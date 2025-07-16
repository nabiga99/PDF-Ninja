
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Upload, Download, X, FileText } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { mergePDFs, downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';
import { useDropzone } from 'react-dropzone';

interface MergeToolProps {
  file: PDFFile;
}

export const MergeTool = ({ file }: MergeToolProps) => {
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mergedFile, setMergedFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setAdditionalFiles(prev => [...prev, ...acceptedFiles]);
    },
    disabled: isProcessing
  });

  const removeFile = (index: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    try {
      if (additionalFiles.length === 0) {
        throw new Error('Please add at least one additional PDF file to merge');
      }

      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const allFiles = [file.file, ...additionalFiles];
      const result = await mergePDFs(allFiles, setProgress);
      
      setMergedFile(result.file);
      toast({
        title: "Success!",
        description: `${allFiles.length} PDFs have been merged successfully`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to merge PDFs';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (mergedFile) {
      const fileName = file.name.replace('.pdf', '_merged.pdf');
      downloadFile(mergedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Files to Merge</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">1. {file.name}</span>
            </div>
          </div>
        </div>

        {additionalFiles.length > 0 && (
          <div className="space-y-2">
            {additionalFiles.map((additionalFile, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {index + 2}. {additionalFile.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    disabled={isProcessing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            {isDragActive
              ? 'Drop PDF files here...'
              : 'Drag & drop additional PDF files here, or click to select'}
          </p>
        </div>

        <Button
          onClick={handleMerge}
          disabled={isProcessing || additionalFiles.length === 0}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          {isProcessing ? 'Merging PDFs...' : `Merge ${additionalFiles.length + 1} PDFs`}
        </Button>

        {isProcessing && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Processing... {progress}%
            </p>
          </div>
        )}
      </div>

      {mergedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              PDFs Merged Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Your PDFs have been combined into a single document.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Merged PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
