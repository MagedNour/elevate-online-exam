import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string; // Add accessToken to User
  }

  interface Session extends DefaultSession {
    user: User; // Extend Session's user type
    accessToken?: string; // Add accessToken to Session
  }
}