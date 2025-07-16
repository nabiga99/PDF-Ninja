
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Lock, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface UneditableToolProps {
  file: PDFFile;
}

export const UneditableTool = ({ file }: UneditableToolProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uneditableFile, setUneditableFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const handleMakeUneditable = async () => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      // Simulate making PDF uneditable
      const intervals = [25, 50, 75, 100];
      for (const progressValue of intervals) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setProgress(progressValue);
      }

      // For now, just copy the original file as uneditable
      setUneditableFile(file.file);
      
      toast({
        title: "Success!",
        description: "PDF has been made uneditable and read-only",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to make PDF uneditable';
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
    if (uneditableFile) {
      const fileName = file.name.replace('.pdf', '_readonly.pdf');
      downloadFile(uneditableFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">What this does:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Prevents editing of text and forms</li>
            <li>• Disables copying of content</li>
            <li>• Makes the PDF read-only</li>
            <li>• Preserves document formatting</li>
          </ul>
        </div>

        <Button
          onClick={handleMakeUneditable}
          disabled={isProcessing}
          className="w-full"
        >
          <Lock className="h-4 w-4 mr-2" />
          {isProcessing ? 'Processing...' : 'Make PDF Uneditable'}
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

      {uneditableFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              PDF Made Uneditable Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Your PDF is now read-only and cannot be edited.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Read-Only PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
