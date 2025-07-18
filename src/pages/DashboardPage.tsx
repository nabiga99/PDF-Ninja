import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Header } from '../components/layout/Header';
import SubscriptionDetails from '../components/dashboard/SubscriptionDetails';
import { Footer } from '../components/layout/Footer';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useForm } from 'react-hook-form';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
}

const DashboardPage = () => {
  const { user, profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();
  const [isEditing, setIsEditing] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setValue('fullName', profile.full_name || '');
      setValue('phoneNumber', profile.phone_number || '');
    }
  }, [profile, setValue]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        email: user.email,
        full_name: data.fullName,
        phone_number: data.phoneNumber,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setFormMessage({ type: 'success', text: 'Profile updated successfully!' });
      refreshProfile();
      setIsEditing(false);
    } catch (error: any) {
      setFormMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
    }
  };

  const isProfileIncomplete = !profile?.full_name || !profile?.phone_number;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {profile?.full_name || user?.email || 'Guest'}!
            </h1>
            <p className="text-muted-foreground">Manage your profile and access your tools.</p>
          </div>

          {isProfileIncomplete && !loading && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700">Please fill in your full name and phone number to complete your profile.</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Profile</CardTitle>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                  <Input id="email" type="email" value={user?.email || ''} disabled className="bg-muted" />
                </div>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                  <Input id="fullName" {...register('fullName', { required: 'Full name is required' })} disabled={!isEditing} />
                  {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                  <PhoneInput
                    id="phoneNumber"
                    international
                    defaultCountry="US"
                    value={profile?.phone_number || ''}
                    onChange={(value) => setValue('phoneNumber', value || '')}
                    disabled={!isEditing}
                    className="input PhoneInput"
                  />
                  {errors.phoneNumber && <p className="text-sm text-destructive mt-1">{errors.phoneNumber.message}</p>}
                </div>
                {isEditing && (
                  <Button type="submit">Save Changes</Button>
                )}
                {formMessage && (
                  <p className={`text-sm ${formMessage.type === 'success' ? 'text-green-600' : 'text-destructive'}`}>
                    {formMessage.text}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          <Button onClick={handleSignOut} variant="destructive">Sign Out</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
