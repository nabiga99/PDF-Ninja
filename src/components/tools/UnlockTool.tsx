
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Unlock, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { unlockPDF, downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface UnlockToolProps {
  file: PDFFile;
}

export const UnlockTool = ({ file }: UnlockToolProps) => {
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unlockedFile, setUnlockedFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const handleUnlock = async () => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const result = await unlockPDF(file.file, password, setProgress);
      
      setUnlockedFile(result.file);
      toast({
        title: "Success!",
        description: "PDF has been unlocked successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unlock PDF';
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
    if (unlockedFile) {
      const fileName = file.name.replace('.pdf', '_unlocked.pdf');
      downloadFile(unlockedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="password">Password (if required)</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter PDF password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <Button
          onClick={handleUnlock}
          disabled={isProcessing}
          className="w-full"
        >
          <Unlock className="h-4 w-4 mr-2" />
          {isProcessing ? 'Unlocking...' : 'Unlock PDF'}
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

      {unlockedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Unlock className="h-5 w-5 mr-2" />
              PDF Unlocked Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Your PDF has been unlocked and is ready for download.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Unlocked PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
