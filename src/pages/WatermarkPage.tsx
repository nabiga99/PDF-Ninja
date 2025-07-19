
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';
import { SEO } from '@/components/common/SEO';

const WatermarkPage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('watermark');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Add Watermark to PDF"
        description="Easily add a text or image watermark to your PDF files for free. Protect your documents and brand them accordingly, right in your browser."
        keywords="add watermark to pdf, pdf watermark, watermark pdf, text watermark, image watermark"
      />
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default WatermarkPage;
