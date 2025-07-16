
import { useState } from 'react';
import { Trash2, AlertTriangle, FileText, Grid3X3, Undo2, Download } from 'lucide-react';
import { PDFFile } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { deletePages, downloadFile } from '../../utils/pdfUtils';
import { useToast } from '../../hooks/use-toast';

interface DeleteToolProps {
  file: PDFFile;
}

export const DeleteTool = ({ file }: DeleteToolProps) => {
  const [pagesToDelete, setPagesToDelete] = useState<number[]>([]);
  const [pageRange, setPageRange] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const { toast } = useToast();
  
  const totalPages = file.pageCount || 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const remainingPages = totalPages - pagesToDelete.length;

  const handlePageToggle = (pageNum: number) => {
    setPagesToDelete(prev => 
      prev.includes(pageNum) 
        ? prev.filter(p => p !== pageNum)
        : [...prev, pageNum].sort((a, b) => a - b)
    );
  };

  const handleRangeInput = (range: string) => {
    setPageRange(range);
    
    try {
      const pages: number[] = [];
      const parts = range.split(',').map(s => s.trim());
      
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(s => parseInt(s.trim()));
          if (start && end && start <= end) {
            for (let i = start; i <= Math.min(end, totalPages); i++) {
              if (!pages.includes(i)) pages.push(i);
            }
          }
        } else {
          const pageNum = parseInt(part);
          if (pageNum && pageNum <= totalPages && !pages.includes(pageNum)) {
            pages.push(pageNum);
          }
        }
      }
      
      setPagesToDelete(pages.sort((a, b) => a - b));
    } catch (error) {
      // Invalid range format
    }
  };

  const handleDeleteEveryNth = (n: number) => {
    const nthPages = pages.filter((_, index) => (index + 1) % n === 0);
    setPagesToDelete(nthPages);
  };

  const handleClearSelection = () => {
    setPagesToDelete([]);
    setPageRange('');
  };

  const handleDelete = () => {
    if (remainingPages === 0) {
      return;
    }
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setShowConfirmation(false);
    
    try {
      const result = await deletePages(file.file, pagesToDelete);
      
      setProcessedFile(result.file);
      setPagesToDelete([]);
      setPageRange('');
      
      toast({
        title: "Pages Deleted",
        description: `${pagesToDelete.length} pages removed. ${result.remainingPages} pages remaining.`,
      });
      
    } catch (error) {
      console.error('Delete failed:', error);
      toast({
        title: "Delete Failed",
        description: "An error occurred while deleting pages",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      const filename = file.name.replace('.pdf', '_modified.pdf');
      downloadFile(processedFile, filename);
      
      toast({
        title: "Download Started",
        description: `Downloading ${filename}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* File Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Filename</p>
              <p className="font-medium">{file.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pages</p>
              <p className="font-medium">{totalPages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To Delete</p>
              <p className="font-medium text-destructive">{pagesToDelete.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="font-medium text-success">{remainingPages}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      {pagesToDelete.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {remainingPages === 0 ? (
              <span className="text-destructive font-medium">
                Warning: You cannot delete all pages. At least one page must remain.
              </span>
            ) : (
              <>
                You are about to delete {pagesToDelete.length} page{pagesToDelete.length !== 1 ? 's' : ''}.
                This action cannot be undone.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5" />
            <span>Select Pages to Delete</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Range Input */}
          <div>
            <label className="text-sm font-medium">Page Range</label>
            <Input
              placeholder="e.g., 1-5, 8, 10-12"
              value={pageRange}
              onChange={(e) => handleRangeInput(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter page numbers and ranges separated by commas
            </p>
          </div>

          {/* Quick Selection */}
          <div>
            <label className="text-sm font-medium">Quick Selection</label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDeleteEveryNth(2)}
              >
                Every 2nd Page
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDeleteEveryNth(3)}
              >
                Every 3rd Page
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearSelection}
              >
                Clear Selection
              </Button>
            </div>
          </div>

          {/* Page Grid */}
          <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-12 gap-2">
            {pages.map((pageNum) => {
              const isMarkedForDeletion = pagesToDelete.includes(pageNum);
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageToggle(pageNum)}
                  className={`
                    aspect-[3/4] border-2 rounded-lg flex items-center justify-center
                    text-sm font-medium transition-all
                    ${isMarkedForDeletion 
                      ? 'border-destructive bg-destructive text-destructive-foreground shadow-lg' 
                      : 'border-border hover:border-destructive bg-card'
                    }
                  `}
                >
                  {pageNum}
                  {isMarkedForDeletion && (
                    <Trash2 className="h-3 w-3 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {pagesToDelete.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-sm text-muted-foreground">Pages to delete:</span>
              {pagesToDelete.map((pageNum) => (
                <Badge key={pageNum} variant="destructive">
                  {pageNum}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Action */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleDelete}
            disabled={pagesToDelete.length === 0 || remainingPages === 0 || isDeleting}
            variant="destructive"
            className="w-full"
            size="lg"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : `Delete ${pagesToDelete.length} Pages`}
          </Button>
          
          {pagesToDelete.length === 0 && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              Please select at least one page to delete
            </p>
          )}
        </CardContent>
      </Card>

      {/* Download Modified PDF */}
      {processedFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Modified PDF Ready</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download Modified PDF
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span>Confirm Deletion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Are you sure you want to delete {pagesToDelete.length} page{pagesToDelete.length !== 1 ? 's' : ''} 
              from "{file.name}"?
            </p>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. The pages will be permanently removed from the PDF.
            </p>
            
            <div className="flex space-x-2">
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="flex-1"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Yes, Delete Pages'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1"
                disabled={isDeleting}
              >
                <Undo2 className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
