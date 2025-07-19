import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { Presentation, File } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const PowerPointToPdf: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <SEO 
          title="Convert PowerPoint to PDF"
          description="Easily convert your PowerPoint presentations (.pptx) to professional PDF files. Secure and instant conversion."
          keywords="powerpoint to pdf, convert powerpoint to pdf, pptx to pdf"
        />
        <DocumentConverter
          title="PowerPoint to PDF"
          description="Convert PowerPoint presentations to professional PDF format"
          fromFormat="pptx"
          toFormat="pdf"
          acceptedFileTypes={['.pptx']}
          inputIcon={Presentation}
          outputIcon={File}
        />
      </main>
      <Footer />
    </div>
  );
};
