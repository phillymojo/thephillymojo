import GoogleProvider from "next-auth/providers/google";

// Emails allowed to access the dashboard
const ALLOWED_EMAILS = [
  // Add your email(s) here
  // "you@gmail.com",
  // "family@gmail.com",
  "mbonar@gmail.com",
];

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  cookies: process.env.NEXTAUTH_COOKIE_DOMAIN
    ? {
        sessionToken: {
          name:
            (process.env.NEXTAUTH_URL || "").startsWith("https://")
              ? "__Secure-next-auth.session-token"
              : "next-auth.session-token",
          options: {
            domain: process.env.NEXTAUTH_COOKIE_DOMAIN,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: (process.env.NEXTAUTH_URL || "").startsWith("https://"),
          },
        },
      }
    : undefined,
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
