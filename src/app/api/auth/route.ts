import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const correctPassword = process.env.ADMIN_PASSWORD;

        if (!correctPassword) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        if (password === correctPassword) {
            // In a real app, you'd set a secure HttpOnly cookie here.
            // For this portfolio, we will just return success and let the client handle state.
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
