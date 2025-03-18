// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkAdminStatus, logout } from '../lib/auth';

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check admin status whenever the component mounts or route changes
    const checkAuth = () => {
      setIsAdmin(checkAdminStatus());
    };
    
    checkAuth();
    
    // Listen for route changes
    router.events.on('routeChangeComplete', checkAuth);
    
    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            My Portfolio
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className={router.pathname === '/' ? 'text-blue-300' : 'hover:text-blue-300'}>
              Home
            </Link>
            <Link href="/blogs" className={router.pathname.startsWith('/blogs') ? 'text-blue-300' : 'hover:text-blue-300'}>
              Blogs
            </Link>
            {isAdmin && (
              <Link href="/admin" className={router.pathname.startsWith('/admin') ? 'text-blue-300' : 'hover:text-blue-300'}>
                Admin
              </Link>
            )}
          </nav>
        </div>
        
        <div>
          {isAdmin ? (
            <button 
              onClick={handleLogout}
              className="text-red-300 hover:text-red-100"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="hover:text-blue-300">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}