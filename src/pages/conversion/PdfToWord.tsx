import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileText, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const PdfToWord: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert PDF to Word"
          description="Easily convert your PDF documents to editable Word documents (.docx) for free. Secure and instant conversion in your browser."
          keywords="pdf to word, convert pdf to word, pdf to docx"
        />
        <DocumentConverter
          title="PDF to Word"
          description="Convert PDF documents to editable Word format"
          fromFormat="pdf"
          toFormat="docx"
          acceptedFileTypes={['.pdf']}
          inputIcon={File}
          outputIcon={FileText}
        />
      </main>
      <Footer />
    </div>
  );
};
