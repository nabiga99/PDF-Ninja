
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const ProtectPage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('protect');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Protect PDF - Add Password to PDF"
        description="Secure your PDF files by adding a password for free. Our online tool lets you encrypt your PDFs to prevent unauthorized access, right in your browser."
        keywords="protect pdf, password protect pdf, encrypt pdf, secure pdf, add password to pdf"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectPage;
