import React from 'react';
import { DocumentConverter } from '@/components/conversion/DocumentConverter';
import { SEO } from '@/components/common/SEO';
import { FileText, File } from 'lucide-react';

export const WordToPdf: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <SEO 
        title="Convert Word to PDF"
        description="Easily convert your Word documents (.docx, .doc) to high-quality PDF documents for free. Secure and instant conversion in your browser."
        keywords="word to pdf, convert word to pdf, docx to pdf, doc to pdf"
      />
      <DocumentConverter
        title="Word to PDF"
        description="Convert Word documents to PDF format"
        fromFormat="docx"
        toFormat="pdf"
        acceptedFileTypes={['.docx', '.doc']}
        inputIcon={FileText}
        outputIcon={File}
      />
    </div>
  );
};
