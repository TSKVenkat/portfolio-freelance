import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkAdminStatus } from '../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthorized = checkAdminStatus();
      
      if (!isAuthorized) {
        router.push('/login?returnUrl=' + encodeURIComponent(router.asPath));
        return;
      }
      
      setAuthorized(true);
      setLoading(false);
    };

    checkAuth();
    
    // Add event listener for storage changes (in case of logout in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return authorized ? <>{children}</> : null;
}