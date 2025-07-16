
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ToolContainer } from '../components/tools/ToolContainer';

const RedactPage = () => {
  const setCurrentTool = useAppStore((state) => state.setCurrentTool);

  useEffect(() => {
    setCurrentTool('redact');
  }, [setCurrentTool]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ToolContainer />
      </main>
      <Footer />
    </div>
  );
};

export default RedactPage;
