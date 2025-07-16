
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Shield, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { protectPDF, downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface ProtectToolProps {
  file: PDFFile;
}

export const ProtectTool = ({ file }: ProtectToolProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [protectedFile, setProtectedFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const handleProtect = async () => {
    try {
      if (!password.trim()) {
        throw new Error('Please enter a password');
      }
      
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const result = await protectPDF(file.file, password, setProgress);
      
      setProtectedFile(result.file);
      toast({
        title: "Success!",
        description: "PDF has been password protected",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to protect PDF';
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
    if (protectedFile) {
      const fileName = file.name.replace('.pdf', '_protected.pdf');
      downloadFile(protectedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <Button
          onClick={handleProtect}
          disabled={isProcessing || !password.trim() || password !== confirmPassword}
          className="w-full"
        >
          <Shield className="h-4 w-4 mr-2" />
          {isProcessing ? 'Protecting...' : 'Protect PDF'}
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

      {protectedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              PDF Protected Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Your PDF has been password protected and is ready for download.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Protected PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
