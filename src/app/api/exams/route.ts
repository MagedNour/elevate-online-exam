import { JSON_HEADER } from "@/lib/types/constants/api.constant";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const token = await getToken({ req });
    const accessToken = token?.token;


    const subject = req.nextUrl.searchParams.get("subject");
    console.log(subject);


    if (subject === "all") {
        const response = await fetch("https://exam.elevateegy.com/api/v1/exams", {
            method: "GET",
            headers: {
                ...JSON_HEADER,
                token: accessToken as string,
            },
        });

        const data = await response.json();
        return NextResponse.json({ data: data }, { status: 200 })
    } else {
        const response = await fetch(`https://exam.elevateegy.com/api/v1/exams?subject=${subject}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: accessToken as string,
            },
        });

        const data = await response.json();
        return NextResponse.json({ data: data }, { status: 200 })
    }

}