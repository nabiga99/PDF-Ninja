
import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FileUploader } from '../components/upload/FileUploader';
import { FileList } from '../components/upload/FileList';
import { ExtractTool } from '../components/tools/ExtractTool';
import { useAppStore } from '../store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, FileText } from 'lucide-react';

const ExtractPage = () => {
  const { setCurrentTool, uploadedFiles, selectedFileId, error } = useAppStore();
  const selectedFile = uploadedFiles.find((f) => f.id === selectedFileId);

  useEffect(() => {
    setCurrentTool('extract');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-subtle flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Extract Pages</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select and extract specific pages from your PDF document
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <FileUploader />
              <FileList />
            </div>

            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Extract Pages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <ExtractTool file={selectedFile} />
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

export default ExtractPage;
