import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const handleGoogleSignUp = async () => {
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
        title: 'Google Sign-up failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleSignUp = async (data: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone_number: data.phoneNumber,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Check your email to complete sign-up!',
        description: 'A verification link has been sent to your email address. Please click the link to confirm your account before signing in.',
        duration: 10000, // Show for 10 seconds
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign-up failed',
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
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Enter your details to get started.</p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field }) => <Input {...field} id="fullName" placeholder="John Doe" />}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message as string}</p>}
            </div>
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
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  validate: (value) => isPossiblePhoneNumber(value) || 'Invalid phone number',
                }}
                render={({ field }) => <PhoneInput {...field} id="phoneNumber" placeholder="Enter phone number" className="input" />}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message as string}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                render={({ field }) => <Input {...field} id="password" type="password" placeholder="••••••••" />}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
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
          <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
            Sign Up with Google
          </Button>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-medium text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
