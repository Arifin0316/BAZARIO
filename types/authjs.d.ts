import { type DefaultSession } from "next-auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession["user"];
    }
    interface User {
        role: string ;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string;
        role: string;
    }
}