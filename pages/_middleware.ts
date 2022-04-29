import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
    const secret = process.env.JWT_SECRET!;
    const token = await getToken({ req, secret });

    const { pathname, origin } = req.nextUrl;

    if (token && pathname.includes("/login")) {
        return NextResponse.redirect(origin + "/");
    }

    if (
        token ||
        pathname.includes("/api/auth") ||
        pathname === "/login" ||
        pathname === "/dec.svg"
    ) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(origin + "/login");
    }
}
