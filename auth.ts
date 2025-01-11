import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import { SignInSchema } from './lib/zod';
import { compareSync } from 'bcrypt-ts';

import type { Adapter } from 'next-auth/adapters';


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        name: {},
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('Credentials are required');
        }

        const validateField = SignInSchema.safeParse(credentials);
        if (!validateField.success) {
          throw new Error('Invalid credentials format');
        }

        const { email, password } = validateField.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
          throw new Error('No user found or password missing');
        }

        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  // callback
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedin = !!auth?.user;
      const protectedRoutes = ['/dashboard', '/user', '/prodak'];

      if (!isLoggedin && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isLoggedin && nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});
