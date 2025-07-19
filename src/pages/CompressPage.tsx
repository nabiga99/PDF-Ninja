
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Zap } from 'lucide-react';
import { SmartPDFCompressor } from '@/components/compression/SmartPDFCompressor';
import { SEO } from '@/components/common/SEO';

const CompressPage = () => {
    useEffect(() => {
    // You might want to use a store to set the current tool, e.g., for header active states
    // useAppStore.getState().setCurrentTool('compress');
  }, []);

  return (
    <div className="min-h-screen bg-subtle flex flex-col">
      <SEO 
        title="Compress PDF - Reduce PDF File Size"
        description="Easily compress your PDF files to reduce their size while maintaining quality. Our free online tool makes it simple to shrink large PDFs for easier sharing and storage."
        keywords="compress pdf, pdf compressor, reduce pdf size, shrink pdf, optimize pdf"
      />
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* Tool Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Compress PDF</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose between the best cloud-based compression for quality or fast, private client-side compression.
            </p>
          </div>

                    <div className="flex justify-center">
            <SmartPDFCompressor />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompressPage;
