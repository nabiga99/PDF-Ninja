
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const UnlockPage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('unlock');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Unlock PDF - Remove PDF Password"
        description="Easily remove passwords from your PDF files for free, provided you have the right to do so. Our online tool helps you unlock PDFs quickly and securely in your browser."
        keywords="unlock pdf, remove pdf password, pdf password remover, decrypt pdf"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default UnlockPage;
