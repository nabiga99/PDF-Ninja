import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { Presentation, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const PdfToPowerPoint: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert PDF to PowerPoint"
          description="Easily convert your PDF documents into editable PowerPoint presentations (.pptx). Secure and instant conversion."
          keywords="pdf to powerpoint, convert pdf to powerpoint, pdf to pptx"
        />
        <DocumentConverter
          title="PDF to PowerPoint"
          description="Convert PDF documents to editable PowerPoint format"
          fromFormat="pdf"
          toFormat="pptx"
          acceptedFileTypes={['.pdf']}
          inputIcon={File}
          outputIcon={Presentation}
        />
      </main>
      <Footer />
    </div>
  );
};
