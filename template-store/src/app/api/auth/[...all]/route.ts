import { auth } from "../../../../lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

// Debug Log: Sunucu başladığında veya rota ilk çağrıldığında çalışır
console.log("Better Auth Handlers initialized. Keys:", Object.keys(handlers || {}));

export const GET = async (request: Request) => {
    if (!handlers || !handlers.GET) {
        console.error("Handlers.GET is undefined! Check better-auth initialization.");
        return NextResponse.json({ error: "Method Not Allowed (Missing Handler GET)" }, { status: 405 });
    }
    return handlers.GET(request);
};

export const POST = async (request: Request) => {
    if (!handlers || !handlers.POST) {
        console.error("Handlers.POST is undefined! Check better-auth initialization.");
        return NextResponse.json({ error: "Method Not Allowed (Missing Handler POST)" }, { status: 405 });
    }
    return handlers.POST(request);
};
