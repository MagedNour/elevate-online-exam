import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { to } from '../../../.next/server/vendor-chunks/next';

declare module "next-auth" {

    /* The shape of the user object returned in the OAuth providers' `profile` callback,
    * or the second parameter of the `session` callback, when using a database.
    */
    interface User extends Pick<DatabaseFields, "_id"> {
        token: string;
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        role: string;
        isVerified: boolean;
    }

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        role: string;
        isVerified: boolean;
        token: string; // To be removed from here in the future
    }
}


declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        token: string;
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        role: string;
        isVerified: boolean;
    }
}