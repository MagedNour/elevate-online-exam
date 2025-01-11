import { JSON_HEADER } from "@/lib/types/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const token = await getToken({ req });
    const accessToken = token?.token;

    const id = req.nextUrl.searchParams.get("exam");
    console.log(id);

    const response = await fetch(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`, {
        method: "GET",
        headers: {
             ...JSON_HEADER,
            token: accessToken as string,
        },
    });

    const data = await response.json();
    return NextResponse.json({ data: data }, { status: 200 })

}
