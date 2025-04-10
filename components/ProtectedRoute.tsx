import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if route should be protected
    const checkAuth = () => {
      if (status === "loading") return;

      // If user is not authenticated or not an admin, redirect to login
      if (!session || !session.user?.isAdmin) {
        router.push('/login?returnUrl=' + encodeURIComponent(router.asPath));
        return;
      }
      
      // If we get here, user is authorized
      setAuthorized(true);
    };

    checkAuth();
  }, [status, session, router]);

  // Show loading state while checking session
  if (status === "loading" || !authorized) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="mb-4"
        >
          <FiLoader className="w-8 h-8 text-primary-500" />
        </motion.div>
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}