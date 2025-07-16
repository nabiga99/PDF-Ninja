import { FileText, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileList = () => {
  const { uploadedFiles, selectedFileId, selectFile, removeUploadedFile } = useAppStore();

  if (uploadedFiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Uploaded Files</h3>
      
      {uploadedFiles.map((file) => {
        const isSelected = file.id === selectedFileId;
        const statusIcon = () => {
          switch (file.processingStatus) {
            case 'processing':
              return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
            case 'completed':
              return <CheckCircle2 className="h-4 w-4 text-success" />;
            case 'error':
              return <AlertCircle className="h-4 w-4 text-destructive" />;
            default:
              return <FileText className="h-4 w-4 text-muted-foreground" />;
          }
        };

        return (
          <Card
            key={file.id}
            className={`cursor-pointer transition-all duration-200 ${
              isSelected
                ? 'ring-2 ring-primary shadow-ninja-glow'
                : 'hover:shadow-card'
            }`}
            onClick={() => selectFile(file.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {statusIcon()}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.pageCount && (
                        <>
                          <span>•</span>
                          <span>{file.pageCount} pages</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {file.processingStatus && (
                    <Badge
                      variant={
                        file.processingStatus === 'completed'
                          ? 'default'
                          : file.processingStatus === 'error'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {file.processingStatus}
                    </Badge>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeUploadedFile(file.id);
                    }}
                    className="h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {file.processingStatus === 'processing' && file.progress !== undefined && (
                <div className="mt-3">
                  <Progress value={file.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Processing... {Math.round(file.progress)}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};