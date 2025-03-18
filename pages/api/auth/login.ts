// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { isAdmin } from '../../../lib/auth';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Check if the email matches the admin email
  const authorized = isAdmin(email);

  if (authorized) {
    // Set a cookie with the admin email
    res.setHeader('Set-Cookie', cookie.serialize('email', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/',
    }));

    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ message: 'Invalid email' });
  }
}