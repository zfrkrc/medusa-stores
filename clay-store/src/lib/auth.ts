import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET || "supersecretbetterauthkey123",
    baseURL: process.env.BETTER_AUTH_URL || "https://claybysevgi.com",
    emailAndPassword: {
        enabled: true,
    },
    user: {
        modelName: "clay_user",
    },
    session: {
        modelName: "clay_session",
    },
    account: {
        modelName: "clay_account",
    },
    verification: {
        modelName: "clay_verification",
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
});
