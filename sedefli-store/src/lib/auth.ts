import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET || "supersecretbetterauthkey123",
    baseURL: process.env.BETTER_AUTH_URL || "https://sedefliatolye.com.tr",
    emailAndPassword: {
        enabled: true,
    },
    user: {
        modelName: "sedef_user",
    },
    session: {
        modelName: "sedef_session",
    },
    account: {
        modelName: "sedef_account",
    },
    verification: {
        modelName: "sedef_verification",
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
});
