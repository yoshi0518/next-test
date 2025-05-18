import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [GoogleProvider],
  pages: {
    signIn: '/signin',
  },
});
