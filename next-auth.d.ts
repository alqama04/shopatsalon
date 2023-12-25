import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            business_customer: boolean;
            name: string;
            image?: string;
            email?: string;
            userId: string;
        } & DefaultSession;
    }
    
    interface User extends DefaultUser {
        role: string;
        userId: string;
        business_customer: boolean;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        userId: string;
        role: string;
        business_customer: boolean;
    }
}
