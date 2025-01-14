import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = await cookies()
    const user = cookieStore.get('user')

    if (user) {
        return NextResponse.json(user.value);
    } else {
        return NextResponse.json({
            message: "Not logged in",
        });
    }
}