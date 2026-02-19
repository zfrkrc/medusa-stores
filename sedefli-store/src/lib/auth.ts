import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const auth = betterAuth({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET || "supersecretbetterauthkey123",
    baseURL: process.env.BETTER_AUTH_URL || "https://hobby.zaferkaraca.net", // Explicit base URL
    emailAndPassword: {
        enabled: true,
    },
    user: {
        modelName: "hobby_user",
    },
    session: {
        modelName: "hobby_session",
    },
    account: {
        modelName: "hobby_account",
    },
    verification: {
        modelName: "hobby_verification",
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
});
