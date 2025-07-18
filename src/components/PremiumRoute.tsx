import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const PremiumRoute = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    // You can render a loading spinner here while the profile is being fetched.
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (profile?.subscription_status !== 'paid') {
    return <Navigate to="/pricing" replace />;
  }

  return <Outlet />;
};

export default PremiumRoute;
