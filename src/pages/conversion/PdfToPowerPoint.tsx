import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { Presentation, File } from 'lucide-react';

export const PdfToPowerPoint: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <SEO 
        title="Convert PDF to PowerPoint"
        description="Easily convert your PDF documents to editable PowerPoint presentations (.pptx) for free. Secure and instant conversion in your browser."
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
    </div>
  );
};
