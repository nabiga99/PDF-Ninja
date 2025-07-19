import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, FileText, FileSpreadsheet, Presentation, File } from 'lucide-react';
import { useDocumentConversion } from '@/hooks/useDocumentConversion';
import { validateFile } from '@/utils/fileValidation';

interface DocumentConverterProps {
  title: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  acceptedFileTypes: string[];
  inputIcon: React.ComponentType<{ className?: string }>;
  outputIcon: React.ComponentType<{ className?: string }>;
}

export const DocumentConverter: React.FC<DocumentConverterProps> = ({
  title,
  description,
  fromFormat,
  toFormat,
  acceptedFileTypes,
  inputIcon: InputIcon,
  outputIcon: OutputIcon
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { isConverting, progress, error, convertedFile, convertFile, reset, downloadFile } = useDocumentConversion();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const error = validateFile(file, acceptedFileTypes);
      if (error) {
        setValidationError(error);
        setSelectedFile(null);
      } else {
        setValidationError(null);
        setSelectedFile(file);
        reset();
      }
    }
  };

  const handleConvert = () => {
    if (!selectedFile) return;
    convertFile(selectedFile, fromFormat, toFormat);
  };

  const handleDownload = () => {
    if (!selectedFile || !convertedFile) return;
    
    const originalName = selectedFile.name;
    const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
    const newFilename = `${baseName}.${toFormat}`;
    
    downloadFile(newFilename);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <InputIcon className="h-12 w-12 text-blue-500" />
          <div className="text-2xl text-gray-400">→</div>
          <OutputIcon className="h-12 w-12 text-green-500" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select file to convert
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  Accepted: {acceptedFileTypes.join(', ')}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={acceptedFileTypes.join(',')}
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>

        {/* Selected File Display */}
        {selectedFile && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <File className="h-8 w-8 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-blue-900">{selectedFile.name}</p>
                <p className="text-sm text-blue-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Display */}
        {isConverting && progress && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Converting...</span>
              <span className="text-sm text-gray-500">{progress.message}</span>
            </div>
            <Progress value={progress.percentage} className="w-full" />
          </div>
        )}

        {/* Validation Error Display */}
        {validationError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-600">
              {validationError}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Display */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Success Display */}
        {convertedFile && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-600">
              File converted successfully! Click download to save the result.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleConvert}
            disabled={!selectedFile || isConverting || !!validationError}
            className="flex-1"
            size="lg"
          >
            {isConverting ? 'Converting...' : `Convert to ${toFormat.toUpperCase()}`}
          </Button>

          {convertedFile && (
            <Button
              onClick={handleDownload}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
