import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8">
        <div className="w-full max-w-4xl mx-auto p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border">
          <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
          <p>Hello, {user?.email}!</p>
          <p>This is your personal space. More features coming soon!</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
