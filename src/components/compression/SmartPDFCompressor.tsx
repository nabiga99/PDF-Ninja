import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FileDown, Upload, Zap, Lock, Rocket } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CloudPDFCompressor } from './CloudPDFCompressor';
import { OfflinePDFCompressor } from './OfflinePDFCompressor';
import { formatBytes } from '../../utils/formatBytes';
import { useAuthStore } from '@/store/useAuthStore';

interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export const SmartPDFCompressor: React.FC = () => {
  const { isPremiumUser } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [compressionMethod, setCompressionMethod] = useState<'cloud' | 'offline'>('cloud');
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);

  useEffect(() => {
    // If user is not premium, force offline compression and disable cloud option
    if (!isPremiumUser) {
      setCompressionMethod('offline');
    }
  }, [isPremiumUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setCompressionResult(null); // Reset result when new file is selected
  };

  const handleCompressionComplete = (result: { blob: Blob; originalSize: number; compressedSize: number; }) => {
    const compressionRatio = ((result.originalSize - result.compressedSize) / result.originalSize * 100);
    setCompressionResult({ ...result, compressionRatio });
  };

  const handleDownload = () => {
    if (!compressionResult || !file) return;
    const url = URL.createObjectURL(compressionResult.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, '_compressed.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderCompressor = () => {
    if (compressionMethod === 'cloud' && isPremiumUser) {
      return <CloudPDFCompressor file={file!} onComplete={handleCompressionComplete} />;
    }
    return <OfflinePDFCompressor file={file!} onComplete={handleCompressionComplete} />;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Zap className="h-6 w-6 text-primary" />
          Compress PDF File
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!file ? (
          <div className="text-center border-2 border-dashed border-muted rounded-lg p-12">
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground"/>
              <p className="mt-2 text-sm text-muted-foreground">Drag & drop your PDF here, or click to select a file</p>
            </Label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatBytes(file.size)}</p>
            </div>

            <div className="space-y-4">
                <Label>Choose Compression Method</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant={compressionMethod === 'cloud' ? 'default' : 'outline'}
                      onClick={() => setCompressionMethod('cloud')}
                      disabled={!isPremiumUser}
                      className="justify-start p-4 h-auto"
                    >
                        <Rocket className="w-5 h-5 mr-3" />
                        <div className="text-left">
                            <p className="font-semibold">Best Quality</p>
                            <p className="text-xs font-normal text-muted-foreground">Online, max compression</p>
                        </div>
                    </Button>
                    <Button 
                      variant={compressionMethod === 'offline' ? 'default' : 'outline'}
                      onClick={() => setCompressionMethod('offline')}
                      className="justify-start p-4 h-auto"
                    >
                        <Lock className="w-5 h-5 mr-3" />
                        <div className="text-left">
                            <p className="font-semibold">Privacy First</p>
                            <p className="text-xs font-normal text-muted-foreground">Offline, basic compression</p>
                        </div>
                    </Button>
                </div>
                {!isPremiumUser && compressionMethod === 'cloud' && (
                    <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertDescription>Best Quality compression is a premium feature. Please upgrade.</AlertDescription>
                    </Alert>
                )}
            </div>

            {renderCompressor()}
          </div>
        )}

        {compressionResult && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Compression Complete!</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Original Size</p>
                <p className="font-mono font-semibold">{formatBytes(compressionResult.originalSize)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">New Size</p>
                <p className="font-mono font-semibold">{formatBytes(compressionResult.compressedSize)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">You Saved</p>
                <p className="font-mono font-semibold text-green-600 dark:text-green-400">{compressionResult.compressionRatio.toFixed(1)}%</p>
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full mt-4">
              <FileDown className="w-4 h-4 mr-2" />
              Download Compressed PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
