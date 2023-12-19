import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
       GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if(account && user) {
                token.userId = user.id;
            }

            if(account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session ({ session, token }) {
            // tak the userid from token and add it to the session
            session.user!.id = token.userId as string;
            

            session.accessToken = token.accessToken;
            return session;
        }
    },

}
// export auth options
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }