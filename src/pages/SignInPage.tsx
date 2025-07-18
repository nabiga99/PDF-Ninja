import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const SignInPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Google Sign-in failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleSignIn = async (data: any) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Sign-in failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto py-8 flex items-center justify-center">
                  <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-lg border">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-muted-foreground">Welcome back! Sign in to your account.</p>
            </div>
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => <Input {...field} id="email" type="email" placeholder="you@example.com" />}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => <Input {...field} id="password" type="password" placeholder="••••••••" />}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Sign In with Google
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link to="/sign-up" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
