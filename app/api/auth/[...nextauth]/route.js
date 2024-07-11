import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@/utils/database";
import User from "@/models/user";


const handler = NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET_CODE
        })
    ],

 
callbacks: {
    async session({ session }) {
        try {

            const sessionUser = await User.findOne({ email: session.user.email });
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            } else {
                console.log('No user found for email:', session.user.email);
            }
            return session;
        } catch (error) {
            console.error('Error in session callback:', error);
            return session;
        }
    },

    async signIn({ profile }) {
        try {
            await connectToDB();
            const userExists = await User.findOne({ email: profile.email });
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    username: profile.username ? profile.username.toLowerCase() : profile.email.split('@')[0],
                    image: profile.picture
                });
            }
            return true;
        } catch (error) {
            console.error('Error in signIn callback:', error);
            return false;
        }
    }
}

})

export {handler as GET, handler as POST};