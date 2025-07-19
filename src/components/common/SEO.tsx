import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const fullTitle = `${title} | PDFNinja - Professional PDF Tools`;
  const defaultKeywords = 'PDF, tools, compress, convert, merge, extract, delete, esign, protect, unlock, redact, watermark';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={`${defaultKeywords}, ${keywords}`} />}
    </Helmet>
  );
};
