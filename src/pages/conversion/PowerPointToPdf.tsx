import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { Presentation, File } from 'lucide-react';

export const PowerPointToPdf: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <SEO 
        title="Convert PowerPoint to PDF"
        description="Easily convert your PowerPoint presentations (.pptx, .ppt) to high-quality PDF documents for free. Secure and instant conversion in your browser."
        keywords="powerpoint to pdf, convert powerpoint to pdf, pptx to pdf, ppt to pdf"
      />
      <DocumentConverter
        title="PowerPoint to PDF"
        description="Convert PowerPoint presentations to PDF format"
        fromFormat="pptx"
        toFormat="pdf"
        acceptedFileTypes={['.pptx', '.ppt']}
        inputIcon={Presentation}
        outputIcon={File}
      />
    </div>
  );
};
