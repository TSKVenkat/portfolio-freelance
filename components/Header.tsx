// components/Header.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position to add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const headerClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
    scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium hover:text-primary-500 transition-colors ${
                router.pathname === link.href
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {session?.user?.isAdmin && (
            <Link
              href="/admin"
              className={`font-medium hover:text-primary-500 transition-colors ${
                router.pathname.startsWith('/admin')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Admin
            </Link>
          )}
          
          {session?.user ? (
            <button 
              onClick={handleLogout}
              className="font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login"
              className="font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
            >
              Login
            </Link>
          )}
          
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 font-medium hover:text-primary-500 transition-colors ${
                    router.pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {session?.user?.isAdmin && (
                <Link
                  href="/admin"
                  className={`py-3 font-medium hover:text-primary-500 transition-colors ${
                    router.pathname.startsWith('/admin')
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Admin
                </Link>
              )}
              
              {session?.user ? (
                <button 
                  onClick={handleLogout}
                  className="py-3 text-left font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="py-3 font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors"
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}