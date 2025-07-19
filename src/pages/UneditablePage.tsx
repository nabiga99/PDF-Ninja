
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const UneditablePage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('uneditable');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Make PDF Uneditable - Flatten PDF"
        description="Make your PDF files uneditable by flattening them for free. This process prevents further editing and is perfect for finalizing documents before sharing."
        keywords="make pdf uneditable, flatten pdf, non-editable pdf, secure pdf, finalize pdf"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default UneditablePage;
