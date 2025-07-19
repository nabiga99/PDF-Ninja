
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const MergePage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('merge');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Merge PDF - Combine PDF Files Online"
        description="Easily combine multiple PDF files into a single document for free. Our online tool lets you merge PDFs quickly and securely in your browser."
        keywords="merge pdf, combine pdf, join pdf, pdf merger, combine pdf files"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default MergePage;
