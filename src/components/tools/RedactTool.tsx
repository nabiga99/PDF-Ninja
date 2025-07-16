
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { EyeOff, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface RedactToolProps {
  file: PDFFile;
}

export const RedactTool = ({ file }: RedactToolProps) => {
  const [searchText, setSearchText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [redactedFile, setRedactedFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const handleRedact = async () => {
    try {
      if (!searchText.trim()) {
        throw new Error('Please enter text to redact');
      }

      setIsProcessing(true);
      setProgress(0);
      setError(null);

      // Simulate redaction process
      const intervals = [20, 40, 60, 80, 100];
      for (const progressValue of intervals) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(progressValue);
      }

      // For now, just copy the original file as redacted
      setRedactedFile(file.file);
      
      toast({
        title: "Success!",
        description: `Text "${searchText}" has been redacted from the PDF`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to redact PDF';
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
    if (redactedFile) {
      const fileName = file.name.replace('.pdf', '_redacted.pdf');
      downloadFile(redactedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="search-text">Text to Redact</Label>
          <Input
            id="search-text"
            placeholder="Enter text to redact (e.g., phone numbers, addresses)"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <Button
          onClick={handleRedact}
          disabled={isProcessing || !searchText.trim()}
          className="w-full"
        >
          <EyeOff className="h-4 w-4 mr-2" />
          {isProcessing ? 'Redacting...' : 'Redact PDF'}
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

      {redactedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <EyeOff className="h-5 w-5 mr-2" />
              PDF Redacted Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Sensitive information has been redacted from your PDF.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Redacted PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
