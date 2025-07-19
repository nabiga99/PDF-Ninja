import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { clientSidePdfCompressor } from '@/services/clientSidePdfCompression';
import { Alert, AlertDescription } from '../ui/alert';

interface OfflinePDFCompressorProps {
  file: File;
  onComplete: (result: { blob: Blob; originalSize: number; compressedSize: number; }) => void;
}

export const OfflinePDFCompressor: React.FC<OfflinePDFCompressorProps> = ({ file, onComplete }) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!file) return;
    
    setIsCompressing(true);
    setError(null);

    try {
      // Add a small delay to give user feedback that something is happening
      await new Promise(resolve => setTimeout(resolve, 100)); 

      const compressedBlob = await clientSidePdfCompressor.compressPDF(file);
      
      onComplete({
        blob: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
      });

    } catch (err: any) {
      console.error('Client-side compression failed:', err);
      setError(err.message || 'An unknown error occurred during client-side compression.');
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="space-y-6">
        <p className="text-sm text-muted-foreground text-center">Uses basic compression directly in your browser. Your files are not uploaded. Results may be less effective than the online option.</p>
        <Button 
            onClick={handleCompress}
            disabled={isCompressing}
            size="lg"
            className="w-full"
        >
            <Lock className="w-4 h-4 mr-2" />
            {isCompressing ? 'Compressing in Browser...' : 'Compress with Privacy First'}
        </Button>

        {error && (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
    </div>
  );
};
