import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getSession } from 'next-auth/react';
import { User } from './types';
import bcrypt from 'bcryptjs';
import { authOptions } from '../pages/api/auth/[...nextauth]';

// Admin email that will have access to the admin panel
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tskv.0411@gmail.com';

// Check if a given email is the admin email
export function isAdmin(email: string): boolean {
  return email === ADMIN_EMAIL;
}

// Create a hash for a password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

// Verify password against hash
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Server-side auth check for API routes
export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user?.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  return handler(req, res);
}

// Get the current user from the session
export async function getCurrentUser(req: NextApiRequest, res: NextApiResponse): Promise<User | null> {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user) {
    return null;
  }
  
  return {
    email: session.user.email || '',
    isAdmin: session.user.isAdmin || false
  };
}

// Client-side utility to check if user is admin
export async function isAdminClient(): Promise<boolean> {
  const session = await getSession();
  return session?.user?.isAdmin || false;
}

// Helper to protect admin routes on the client side
export async function requireAdmin(redirectUrl = '/login'): Promise<boolean> {
  const isAdmin = await isAdminClient();
  
  if (!isAdmin && typeof window !== 'undefined') {
    window.location.href = redirectUrl;
    return false;
  }
  
  return true;
}

// Simple login function (legacy - use NextAuth instead)
export async function login(email: string): Promise<boolean> {
  if (isAdmin(email)) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('email', email);
    }
    return true;
  }
  return false;
}

// Logout function (legacy - use NextAuth instead)
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('email');
  }
}