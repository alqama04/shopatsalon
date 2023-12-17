import connectDb from '@/database/connectdb';
import { User } from '@/models/User';
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

export const options: NextAuthOptions = {
    pages: {
        signIn: '/authenticate'
    },
    providers: [
        GoogleProvider({
            async profile(profile: GoogleProfile) {
                console.log(profile)
                connectDb()
                let user;
                user = await User.findOne({ email: profile.email })
                if (!user) {
                    user = await User.create({
                        username: profile.name
                        , email: profile.email
                    })
                }

                const role = profile.role ?? user.role;
                const business_customer = user.business_customer ?? false;

                return {
                    ...profile,
                    business_customer: business_customer,
                    role: role,
                    image: profile.picture,
                    id: profile.sub,
                }
            },

            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }

        }),

    ],
   
    callbacks: {
        async jwt({ token, user, trigger, session }) {
           
          
            if (trigger === 'update') {
                return { ...token, ...session.user }
            }
            if (user) {
                token.role = user.role
                token.business_customer = user.business_customer;
            }
            return token
        },
        async session({ session, token }) {
             
           
            if (session?.user) {
                session.user.business_customer = token.business_customer;
                session.user.role = token.role
            }
            return session
        }
    }
}