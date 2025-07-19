import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileText, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const WordToPdf: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert Word to PDF"
          description="Easily convert your Word documents (.docx) to professional PDF files. Secure and instant conversion in your browser."
          keywords="word to pdf, convert word to pdf, docx to pdf"
        />
        <DocumentConverter
          title="Word to PDF"
          description="Convert Word documents to professional PDF format"
          fromFormat="docx"
          toFormat="pdf"
          acceptedFileTypes={['.docx']}
          inputIcon={FileText}
          outputIcon={File}
        />
      </main>
      <Footer />
    </div>
  );
};
