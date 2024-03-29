import connectDb from '@/database/connectdb';
import { User } from '@/models/User';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

export const options: NextAuthOptions = {
    pages: {
        signIn: '/authenticate'
    },
    providers: [
        GoogleProvider({
            async profile(profile: GoogleProfile) {
                connectDb();
                let user;
                user = await User.findOne({ email: profile.email });
                if (!user) {
                    user = await User.create({
                        username: profile.name,
                        email: profile.email
                    });
                }
                let role;
                if ([process.env.TES_USER].includes(user.email)) {
                    role = 'admin'
                } else { role = user.role }
                const business_customer = user.business_customer ?? false;
                const userId = user?._id;

                return {
                    ...profile,
                    business_customer,
                    role,
                    image: profile.picture,
                    id: profile.sub,
                    userId
                };
            },

            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                return { ...token, ...session.user };
            }
            if (user) {
                token.role = user.role;
                token.business_customer = user.business_customer;
                token.userId = user.userId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                const { email, ...sessionWithoutEmail } = session.user;
                session.user = {
                    ...sessionWithoutEmail,
                    business_customer: token.business_customer,
                    role: token.role,
                    userId: token.userId
                };
            }

            return session;
        }
    }
};
