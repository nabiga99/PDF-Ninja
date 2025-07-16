
import { useState } from 'react';
import { Zap, Download, FileText } from 'lucide-react';
import { PDFFile } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { compressPDF, downloadFile } from '../../utils/pdfUtils';
import { useToast } from '../../hooks/use-toast';

interface CompressionToolProps {
  file: PDFFile;
}

export const CompressionTool = ({ file }: CompressionToolProps) => {
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    compressedFile?: Blob;
  } | null>(null);
  const { toast } = useToast();

  const compressionOptions = [
    { level: 'light' as const, label: 'Light', description: '10-20% reduction', color: 'bg-green-500' },
    { level: 'medium' as const, label: 'Medium', description: '30-50% reduction', color: 'bg-yellow-500' },
    { level: 'heavy' as const, label: 'Heavy', description: '60-80% reduction', color: 'bg-red-500' },
  ];

  const handleCompress = async () => {
    setIsCompressing(true);
    setProgress(0);
    setResult(null);
    
    try {
      const result = await compressPDF(file.file, compressionLevel, setProgress);
      
      setResult({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        compressionRatio: result.compressionRatio,
        compressedFile: result.compressedFile
      });
      
      toast({
        title: "Compression Complete",
        description: `File compressed by ${result.compressionRatio}%`,
      });
      
    } catch (error) {
      console.error('Compression failed:', error);
      toast({
        title: "Compression Failed",
        description: "An error occurred while compressing the PDF",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (result?.compressedFile) {
      const filename = file.name.replace('.pdf', '_compressed.pdf');
      downloadFile(result.compressedFile, filename);
      
      toast({
        title: "Download Started",
        description: `Downloading ${filename}`,
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>File Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Filename</p>
              <p className="font-medium">{file.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Original Size</p>
              <p className="font-medium">{formatFileSize(file.size)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compression Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Compression Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {compressionOptions.map((option) => (
              <button
                key={option.level}
                onClick={() => setCompressionLevel(option.level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  compressionLevel === option.level
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                  <div className="text-left">
                    <h3 className="font-medium">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compression Action */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleCompress}
            disabled={isCompressing}
            className="w-full"
            size="lg"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isCompressing ? 'Compressing...' : 'Compress PDF'}
          </Button>
          
          {isCompressing && (
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground mt-2">
                Compressing... {progress}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Compression Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="text-xl font-semibold">{formatFileSize(result.originalSize)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Compressed Size</p>
                  <p className="text-xl font-semibold text-success">{formatFileSize(result.compressedSize)}</p>
                </div>
              </div>
              
              <div className="text-center">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {result.compressionRatio}% size reduction
                </Badge>
              </div>
              
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Compressed PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
