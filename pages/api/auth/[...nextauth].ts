import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }
        
        try {
          // Log which admin email we're checking against
          console.log(`Checking email: ${credentials.email} against admin: ${process.env.ADMIN_EMAIL}`);
          
          // Check if email matches the admin email
          const isValidEmail = credentials.email === process.env.ADMIN_EMAIL;
          
          if (!isValidEmail) {
            console.log('Email validation failed');
            throw new Error('Invalid email or password');
          }
          
          if (!process.env.ADMIN_PASS_HASH) {
            console.error('ADMIN_PASS_HASH is not defined in environment variables');
            throw new Error('Server configuration error');
          }
          
          // Compare password hash
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            process.env.ADMIN_PASS_HASH
          );
          
          if (!isValidPassword) {
            console.log('Password validation failed');
            throw new Error('Invalid email or password');
          }
          
          console.log('Authentication successful');
          
          // Return the user object if validation passes
          return {
            id: '1',
            email: credentials.email,
            name: 'Admin',
            isAdmin: true
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
} 