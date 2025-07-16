
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FileUploader } from '../components/upload/FileUploader';
import { FileList } from '../components/upload/FileList';
import { CompressionTool } from '../components/tools/CompressionTool';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, Zap } from 'lucide-react';

const CompressPage = () => {
  const { setCurrentTool, uploadedFiles, selectedFileId, error } = useAppStore();
  const selectedFile = uploadedFiles.find((f) => f.id === selectedFileId);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTool('compress');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-subtle flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Tool Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Compress PDF</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Reduce your PDF file size with our advanced compression algorithms while maintaining quality
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1 space-y-6">
              <FileUploader />
              <FileList />
            </div>

            {/* Tool Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Compress PDF</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <CompressionTool file={selectedFile} />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Please upload and select a PDF file to get started
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompressPage;
