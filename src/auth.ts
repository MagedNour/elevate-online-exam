// old Code
// import axios from "axios";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";


// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/login"
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post("https://exam.elevateegy.com/api/v1/auth/signin", {
//             email: credentials?.email,
//             password: credentials?.password,
//           });

//           console.log("user", res.data);

//           const user = res.data;
//           if (user && user.token) {
//             return {
//               id: user.user.id,
//               name: user.user.firstName,
//               email: user.user.email,
//               accessToken: user.token,
//             }as any
//           } else {
//             return null;
//           }
//         } catch (error: any) {
//           if (error.response) {
//             const errorMessage = error.response.data?.message || "Invalid email or password.";
//             throw new Error(errorMessage);
//           }
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // Pass the accessToken to the JWT
//       if (user) {
//         token.accessToken = user.accessToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Pass the accessToken to the session
//       session.accessToken = token.accessToken as string | undefined;
//       return session;
//     },
//   }
// };




// ==================================================

// New Code

import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { JSON_HEADER } from './lib/types/constants/api.constant';
import  GoogleProvider  from 'next-auth/providers/google';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        console.log(credentials);
        const { email, password } = credentials || {};
        const baseUrl = process.env.API + "/auth/signin";

        const response = await fetch(baseUrl, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({ email, password }),
          headers: {
            ...JSON_HEADER,

          }
        })

        const payload: LoginResponse = await response.json();

        if (payload.message === "success") {
          const successPayload = payload as SuccessfulResponse;
          return {
            ...successPayload.user,
            token: successPayload.token
          }
        }
        else {
          const errorPayload = payload as ErrorResponse;
          throw new Error(errorPayload.message);
        }
      }
    }),
    GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    session: ({session, token})=>{
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;
      session.token = token.token;
      return session;
    }
  }

}
