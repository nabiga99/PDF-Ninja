
import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import { PenTool, Download, Trash2 } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { signPDF, downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface ESignToolProps {
  file: PDFFile;
}

export const ESignTool = ({ file }: ESignToolProps) => {
  const [signatureText, setSignatureText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [signedFile, setSignedFile] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const { setError } = useAppStore();

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const canvas = canvasRef.current;
      let signatureData = '';
      
      if (signatureText.trim()) {
        signatureData = signatureText.trim();
      } else if (canvas) {
        signatureData = canvas.toDataURL();
      } else {
        throw new Error('Please provide a signature (text or drawing)');
      }

      const result = await signPDF(file.file, signatureData, setProgress);
      
      setSignedFile(result.file);
      toast({
        title: "Success!",
        description: "PDF has been signed successfully",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign PDF';
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
    if (signedFile) {
      const fileName = file.name.replace('.pdf', '_signed.pdf');
      downloadFile(signedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="signature-text">Text Signature</Label>
          <Input
            id="signature-text"
            type="text"
            placeholder="Type your signature here"
            value={signatureText}
            onChange={(e) => setSignatureText(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div className="space-y-2">
          <Label>Or Draw Your Signature</Label>
          <Card>
            <CardContent className="p-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="border border-border rounded cursor-crosshair w-full"
                style={{ maxWidth: '100%', height: 'auto' }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <div className="flex justify-end mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSignature}
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleSign}
          disabled={isProcessing || (!signatureText.trim() && !canvasRef.current)}
          className="w-full"
        >
          <PenTool className="h-4 w-4 mr-2" />
          {isProcessing ? 'Signing...' : 'Sign PDF'}
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

      {signedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <PenTool className="h-5 w-5 mr-2" />
              PDF Signed Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Your PDF has been signed and is ready for download.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Signed PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
