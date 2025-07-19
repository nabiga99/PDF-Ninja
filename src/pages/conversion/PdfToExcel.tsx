import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileSpreadsheet, File } from 'lucide-react';

export const PdfToExcel: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <SEO 
        title="Convert PDF to Excel"
        description="Easily convert your PDF documents to editable Excel spreadsheets (.xlsx) for free. Secure and instant conversion in your browser."
        keywords="pdf to excel, convert pdf to excel, pdf to xlsx"
      />
      <DocumentConverter
        title="PDF to Excel"
        description="Convert PDF documents to editable Excel format"
        fromFormat="pdf"
        toFormat="xlsx"
        acceptedFileTypes={['.pdf']}
        inputIcon={File}
        outputIcon={FileSpreadsheet}
      />
    </div>
  );
};
