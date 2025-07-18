import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { useAuth } from '../contexts/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: 400, // Amount in cents ($4)
    currency: 'USD',
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ subscription_status: 'paid' })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Upgrade Successful!',
        description: 'Welcome to the Pro plan. All features are now unlocked.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Upgrade Failed',
        description: error.message || 'Could not update your profile. Please contact support.',
        variant: 'destructive',
      });
    }
    console.log('Payment successful, reference:', reference);
  };

  const onClose = () => {
    console.log('Payment modal closed');
  };

  const handleUpgradeClick = () => {
    if (!user) {
      navigate('/sign-in?redirect=/pricing');
    } else {
      initializePayment({ onSuccess, onClose });
    }
  };

  const freeFeatures = [
    'Compress PDF',
    'Split PDF',
    'Organize PDF',
    'PDF to Word',
    'PDF to Excel',
    'PDF to PowerPoint',
    'Sign PDF',
  ];

  const proFeatures = [
    'All features from the Free plan',
    'Unlock PDF',
    'Protect PDF',
    'Redact PDF',
    'Make PDF Uneditable',
    'Add Watermark',
    'Merge PDF',
    'Unlimited access to all tools',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Find the Perfect Plan</h1>
          <p className="mt-4 text-lg text-muted-foreground">Start for free and upgrade to unlock powerful new features.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Free</CardTitle>
              <CardDescription className="text-lg">For casual users</CardDescription>
              <p className="text-4xl font-extrabold mt-4">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6" variant="outline" disabled>Your Current Plan</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary shadow-xl relative">
            <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Pro</CardTitle>
              <CardDescription className="text-lg">For power users</CardDescription>
              <p className="text-4xl font-extrabold mt-4">$4<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6" onClick={handleUpgradeClick}>Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
