import { NextApiRequest, NextApiResponse } from 'next';

// Admin email that will have access to the admin panel
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'tskv.0411@gmail.com';

// Check if a given email is the admin email
export function isAdmin(email: string): boolean {
  return email === ADMIN_EMAIL;
}

// Simple authentication middleware for API routes
export function authMiddleware(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Check for admin email in cookies or authorization header
    const email = req.cookies.email || req.headers.authorization;
    
    if (!email || !isAdmin(email)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return handler(req, res);
  };
}

// For client-side auth checks
export function checkAdminStatus(): boolean {
  if (typeof window === 'undefined') return false;
  
  const email = localStorage.getItem('email');
  return email ? isAdmin(email) : false;
}

// Simple login function
export async function login(email: string): Promise<boolean> {
  if (isAdmin(email)) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('email', email);
    }
    return true;
  }
  return false;
}

// Logout function
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('email');
  }
}