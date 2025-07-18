import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = () => {
  const { user } = useAuth();

  // If you want to show a loading spinner while the session is being fetched,
  // you can add a loading state to the AuthProvider and check it here.
  // For now, we'll just check for the user.

  return user ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
