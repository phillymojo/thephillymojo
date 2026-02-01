import GoogleProvider from "next-auth/providers/google";

// Emails allowed to access the dashboard
const ALLOWED_EMAILS = [
  // Add your email(s) here
  // "you@gmail.com",
  // "family@gmail.com",
  "mbonar@gmail.com",
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // If no allowed emails configured, allow all (for initial setup)
      if (ALLOWED_EMAILS.length === 0) {
        return true;
      }
      // Only allow specific emails
      return ALLOWED_EMAILS.includes(user.email);
    },
    async session({ session, token }) {
      // Add user id to session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
