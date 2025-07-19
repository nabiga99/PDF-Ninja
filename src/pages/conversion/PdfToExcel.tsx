import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileSpreadsheet, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const PdfToExcel: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert PDF to Excel"
          description="Easily extract data from your PDF documents into editable Excel spreadsheets (.xlsx). Secure and instant conversion."
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
      </main>
      <Footer />
    </div>
  );
};
