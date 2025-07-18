import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';

interface Profile {
  subscription_status: 'paid' | 'free' | null;
  subscription_expires_at: string | null;
}

const SubscriptionDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('subscription_status, subscription_expires_at')
            .eq('id', user.id)
            .single();

          if (error) {
            throw error;
          }
          setProfile(data);
        } catch (error) {
          console.error('Error fetching subscription details:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <p>Loading subscription details...</p>;
  }

  const isPro = profile?.subscription_status === 'paid' && profile?.subscription_expires_at && new Date(profile.subscription_expires_at) > new Date();

  const renderProContent = () => {
    if (!profile?.subscription_expires_at) return null;
    const expiryDate = new Date(profile.subscription_expires_at);
    const daysLeft = differenceInDays(expiryDate, new Date());

    return (
      <div>
        <p className="text-lg font-semibold">You are a Pro Member!</p>
        <p className="text-sm text-muted-foreground">Your subscription is active until {format(expiryDate, 'MMMM do, yyyy')}.</p>
        <p className="mt-2">You have <strong>{daysLeft > 0 ? daysLeft : 0} days</strong> left.</p>
      </div>
    );
  };

  const renderFreeContent = () => (
    <div>
      <p className="text-lg font-semibold">You are on the Free Plan.</p>
      <p className="text-sm text-muted-foreground">Unlock all features by upgrading to Pro.</p>
      <Button className="w-full mt-4" onClick={() => navigate('/pricing')}>Upgrade to Pro</Button>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
      </CardHeader>
      <CardContent>
        {isPro ? renderProContent() : renderFreeContent()}
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetails;
