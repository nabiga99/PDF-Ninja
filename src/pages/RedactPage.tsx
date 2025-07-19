
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const RedactPage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('redact');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Redact PDF - Black Out Text in PDF"
        description="Permanently remove sensitive information from your PDF files for free. Our online tool lets you black out text and images securely in your browser."
        keywords="redact pdf, black out pdf, pdf redaction, remove text from pdf, censor pdf"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default RedactPage;
