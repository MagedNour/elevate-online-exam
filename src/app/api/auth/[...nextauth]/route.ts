import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";




export const OPTIONS: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const res = await axios.post('https://exam.elevateegy.com/api/v1/auth/signin', {
                        email: credentials?.email,
                        password: credentials?.password
                    })

                    console.log("res", res.data);
                    if (res.data)
                        return res.data
                    else
                        return null
                }
                catch (error: any) {
                    if (error.response) {
                        const errorMessage = error.response.data?.message || "Invalid email or password.";
                        throw new Error(errorMessage);
                    }
                }



            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ]
}

const handler = NextAuth(OPTIONS)

export { handler as GET, handler as POST }