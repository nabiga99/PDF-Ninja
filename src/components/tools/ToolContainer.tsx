
import { useAppStore } from '../../store/useAppStore';
import { FileUploader } from '../upload/FileUploader';
import { FileList } from '../upload/FileList';
import { CompressionTool } from './CompressionTool';
import { ExtractTool } from './ExtractTool';
import { DeleteTool } from './DeleteTool';
import { ESignTool } from './ESignTool';
import { UnlockTool } from './UnlockTool';
import { ProtectTool } from './ProtectTool';
import { RedactTool } from './RedactTool';
import { UneditableTool } from './UneditableTool';
import { WatermarkTool } from './WatermarkTool';
import { MergeTool } from './MergeTool';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

const toolTitles = {
  compress: 'Compress PDF',
  extract: 'Extract Pages',
  delete: 'Delete Pages',
  esign: 'eSign PDF',
  unlock: 'Unlock PDF',
  protect: 'Protect PDF',
  redact: 'Redact PDF',
  uneditable: 'Make PDF Uneditable',
  watermark: 'Add Watermark',
  merge: 'Merge PDFs',
};

const toolDescriptions = {
  compress: 'Reduce your PDF file size with our advanced compression algorithms',
  extract: 'Select and extract specific pages from your PDF',
  delete: 'Remove unwanted pages from your PDF document',
  esign: 'Create an electronic signature and sign your documents',
  unlock: 'Remove password, encryption, and permissions from your PDF',
  protect: 'Add a password and encrypt your PDF file',
  redact: 'Remove sensitive information from your PDF',
  uneditable: 'Make your PDF uneditable and read-only',
  watermark: 'Add a watermark to your PDFs',
  merge: 'Combine multiple PDFs into one unified document',
};

export const ToolContainer = () => {
  const { currentTool, uploadedFiles, selectedFileId, error } = useAppStore();
  const selectedFile = uploadedFiles.find((f) => f.id === selectedFileId);

  const renderTool = () => {
    if (!selectedFile) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Please upload and select a PDF file to get started
          </p>
        </div>
      );
    }

    switch (currentTool) {
      case 'compress':
        return <CompressionTool file={selectedFile} />;
      case 'extract':
        return <ExtractTool file={selectedFile} />;
      case 'delete':
        return <DeleteTool file={selectedFile} />;
      case 'esign':
        return <ESignTool file={selectedFile} />;
      case 'unlock':
        return <UnlockTool file={selectedFile} />;
      case 'protect':
        return <ProtectTool file={selectedFile} />;
      case 'redact':
        return <RedactTool file={selectedFile} />;
      case 'uneditable':
        return <UneditableTool file={selectedFile} />;
      case 'watermark':
        return <WatermarkTool file={selectedFile} />;
      case 'merge':
        return <MergeTool file={selectedFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Tool Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{toolTitles[currentTool]}</h2>
        <p className="text-muted-foreground text-lg">
          {toolDescriptions[currentTool]}
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          <FileUploader />
          <FileList />
        </div>

        {/* Tool Section */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{toolTitles[currentTool]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTool()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
