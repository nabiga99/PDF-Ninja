import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { FileDown, Upload, Zap } from 'lucide-react';
import { pdfCompressionService, CompressionOptions } from '@/services/pdfCompressionService';
import { ConversionProgress } from '@/services/conversionService';
import { Alert, AlertDescription } from '../ui/alert';

interface CloudPDFCompressorProps {
  file: File;
  onComplete: (result: { blob: Blob; originalSize: number; compressedSize: number; }) => void;
}

export const CloudPDFCompressor: React.FC<CloudPDFCompressorProps> = ({ file, onComplete }) => {
  const [quality, setQuality] = useState<CompressionOptions['quality']>('better');
  const [imageQuality, setImageQuality] = useState<CompressionOptions['imageQuality']>('medium');
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompress = async () => {
    if (!file) return;
    
    setIsCompressing(true);
    setError(null);
    setProgress(null);

    try {
      const compressedBlob = await pdfCompressionService.compressPDF(
        file,
        { quality, imageQuality, removeMetadata, compressImages: true },
        (p) => setProgress(p)
      );
      
      onComplete({
        blob: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
      });

    } catch (err: any) {
      console.error('Compression failed:', err);
      setError(err.message || 'An unknown error occurred during compression.');
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quality-select">Compression Level</Label>
          <Select value={quality} onValueChange={(v) => setQuality(v as any)}>
            <SelectTrigger id="quality-select">
              <SelectValue placeholder="Select quality..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="good">Good (Fastest)</SelectItem>
              <SelectItem value="better">Better (Balanced)</SelectItem>
              <SelectItem value="best">Best (Highest Compression)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="image-quality-select">Image Quality</Label>
          <Select value={imageQuality} onValueChange={(v) => setImageQuality(v as any)}>
            <SelectTrigger id="image-quality-select">
              <SelectValue placeholder="Select image quality..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (Smaller File)</SelectItem>
              <SelectItem value="medium">Medium (Balanced)</SelectItem>
              <SelectItem value="high">High (Best Quality)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="metadata" 
          checked={removeMetadata}
          onCheckedChange={(checked) => setRemoveMetadata(Boolean(checked))}
        />
        <Label htmlFor="metadata">Remove metadata (recommended)</Label>
      </div>

      <div className="flex flex-col gap-4">
        <Button 
          onClick={handleCompress}
          disabled={isCompressing}
          size="lg"
          className="w-full"
        >
          <Zap className="w-4 h-4 mr-2" />
          {isCompressing ? (progress?.message || 'Compressing...') : 'Compress with Best Quality'}
        </Button>
        {isCompressing && progress && (
          <Progress value={progress.percentage} className="w-full h-2" />
        )}
      </div>

      {error && (
        <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
