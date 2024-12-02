import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("https://exam.elevateegy.com/api/v1/auth/signin", {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log("res", res.data);
          if (res.data) return res.data;
          return null;
        } catch (error: any) {
          if (error.response) {
            const errorMessage = error.response.data?.message || "Invalid email or password.";
            throw new Error(errorMessage);
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

// API handler for NextAuth
const handler = NextAuth(authOptions);

// Export HTTP methods for the API route
export { handler as GET, handler as POST };
