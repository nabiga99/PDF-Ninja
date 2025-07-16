
import { useState } from 'react';
import { Eye, Download, FileText, Grid3X3 } from 'lucide-react';
import { PDFFile } from '../../types';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { extractPages, downloadFile } from '../../utils/pdfUtils';
import { useToast } from '../../hooks/use-toast';

interface ExtractToolProps {
  file: PDFFile;
}

export const ExtractTool = ({ file }: ExtractToolProps) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [pageRange, setPageRange] = useState('');
  const [outputMode, setOutputMode] = useState<'single' | 'separate'>('single');
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();
  
  const totalPages = file.pageCount || 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageToggle = (pageNum: number) => {
    setSelectedPages(prev => 
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
      
      setSelectedPages(pages.sort((a, b) => a - b));
    } catch (error) {
      // Invalid range format
    }
  };

  const handleSelectAll = () => {
    setSelectedPages(pages);
  };

  const handleClearSelection = () => {
    setSelectedPages([]);
    setPageRange('');
  };

  const handleExtract = async () => {
    if (selectedPages.length === 0) return;
    
    setIsExtracting(true);
    
    try {
      const result = await extractPages(file.file, selectedPages, outputMode);
      
      // Download all resulting files
      for (const fileData of result.files) {
        downloadFile(fileData.blob, fileData.name);
      }
      
      toast({
        title: "Extraction Complete",
        description: `${result.files.length} PDF file(s) created`,
      });
      
    } catch (error) {
      console.error('Extraction failed:', error);
      toast({
        title: "Extraction Failed",
        description: "An error occurred while extracting pages",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Filename</p>
              <p className="font-medium">{file.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Pages</p>
              <p className="font-medium">{totalPages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selected</p>
              <p className="font-medium">{selectedPages.length} pages</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Grid3X3 className="h-5 w-5" />
            <span>Page Selection</span>
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

          {/* Selection Controls */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearSelection}>
              Clear Selection
            </Button>
          </div>

          {/* Page Grid */}
          <div className="grid grid-cols-8 sm:grid-cols-10 lg:grid-cols-12 gap-2">
            {pages.map((pageNum) => {
              const isSelected = selectedPages.includes(pageNum);
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageToggle(pageNum)}
                  className={`
                    aspect-[3/4] border-2 rounded-lg flex items-center justify-center
                    text-sm font-medium transition-all
                    ${isSelected 
                      ? 'border-primary bg-primary text-primary-foreground shadow-ninja' 
                      : 'border-border hover:border-primary bg-card'
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {selectedPages.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-sm text-muted-foreground">Selected pages:</span>
              {selectedPages.map((pageNum) => (
                <Badge key={pageNum} variant="secondary">
                  {pageNum}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Options */}
      <Card>
        <CardHeader>
          <CardTitle>Output Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <Checkbox 
                checked={outputMode === 'single'} 
                onCheckedChange={() => setOutputMode('single')}
              />
              <div>
                <p className="font-medium">Single PDF File</p>
                <p className="text-sm text-muted-foreground">
                  Combine selected pages into one PDF
                </p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <Checkbox 
                checked={outputMode === 'separate'} 
                onCheckedChange={() => setOutputMode('separate')}
              />
              <div>
                <p className="font-medium">Separate PDF Files</p>
                <p className="text-sm text-muted-foreground">
                  Create individual PDF files for each page
                </p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Extract Action */}
      <Card>
        <CardContent className="pt-6">
          <Button
            onClick={handleExtract}
            disabled={selectedPages.length === 0 || isExtracting}
            className="w-full"
            size="lg"
          >
            <Eye className="h-4 w-4 mr-2" />
            {isExtracting ? 'Extracting...' : `Extract ${selectedPages.length} Pages`}
          </Button>
          
          {selectedPages.length === 0 && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              Please select at least one page to extract
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
