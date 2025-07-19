import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileSpreadsheet, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const ExcelToPdf: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert Excel to PDF"
          description="Easily convert your Excel spreadsheets (.xlsx) to professional PDF files. Secure and instant conversion."
          keywords="excel to pdf, convert excel to pdf, xlsx to pdf"
        />
        <DocumentConverter
          title="Excel to PDF"
          description="Convert Excel spreadsheets to professional PDF format"
          fromFormat="xlsx"
          toFormat="pdf"
          acceptedFileTypes={['.xlsx']}
          inputIcon={FileSpreadsheet}
          outputIcon={File}
        />
      </main>
      <Footer />
    </div>
  );
};
