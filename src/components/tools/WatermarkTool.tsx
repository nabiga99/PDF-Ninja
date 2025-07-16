
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Image, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { addWatermarkPDF, downloadFile } from '../../utils/pdfUtils';
import { toast } from '@/hooks/use-toast';

interface WatermarkToolProps {
  file: PDFFile;
}

export const WatermarkTool = ({ file }: WatermarkToolProps) => {
  const [watermarkText, setWatermarkText] = useState('');
  const [position, setPosition] = useState('center');
  const [opacity, setOpacity] = useState([50]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [watermarkedFile, setWatermarkedFile] = useState<Blob | null>(null);

  const { setError } = useAppStore();

  const handleAddWatermark = async () => {
    try {
      if (!watermarkText.trim()) {
        throw new Error('Please enter watermark text');
      }

      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const result = await addWatermarkPDF(file.file, watermarkText, position, opacity[0], setProgress);
      
      setWatermarkedFile(result.file);
      toast({
        title: "Success!",
        description: "Watermark has been added to your PDF",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add watermark';
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
    if (watermarkedFile) {
      const fileName = file.name.replace('.pdf', '_watermarked.pdf');
      downloadFile(watermarkedFile, fileName);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="watermark-text">Watermark Text</Label>
          <Input
            id="watermark-text"
            placeholder="Enter watermark text (e.g., CONFIDENTIAL, DRAFT)"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Select value={position} onValueChange={setPosition} disabled={isProcessing}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Opacity: {opacity[0]}%</Label>
          <Slider
            value={opacity}
            onValueChange={setOpacity}
            max={100}
            min={10}
            step={10}
            disabled={isProcessing}
            className="mt-2"
          />
        </div>

        <Button
          onClick={handleAddWatermark}
          disabled={isProcessing || !watermarkText.trim()}
          className="w-full"
        >
          <Image className="h-4 w-4 mr-2" />
          {isProcessing ? 'Adding Watermark...' : 'Add Watermark'}
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

      {watermarkedFile && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Watermark Added Successfully
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Watermark has been added to all pages of your PDF.
            </p>
            <Button onClick={handleDownload} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Watermarked PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
