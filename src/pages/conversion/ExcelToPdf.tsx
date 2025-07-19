import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileSpreadsheet, File } from 'lucide-react';

export const ExcelToPdf: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <SEO 
        title="Convert Excel to PDF"
        description="Easily convert your Excel spreadsheets (.xlsx, .xls) to high-quality PDF documents for free. Secure and instant conversion in your browser."
        keywords="excel to pdf, convert excel to pdf, xlsx to pdf, xls to pdf"
      />
      <DocumentConverter
        title="Excel to PDF"
        description="Convert Excel spreadsheets to PDF format"
        fromFormat="xlsx"
        toFormat="pdf"
        acceptedFileTypes={['.xlsx', '.xls']}
        inputIcon={FileSpreadsheet}
        outputIcon={File}
      />
    </div>
  );
};
