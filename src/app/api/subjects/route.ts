import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { JSON_HEADER } from '../../../lib/types/constants/api.constant';

export async function GET(req: NextRequest) {

    const token = await getToken({ req });    
    const accessToken = token?.token;

        const response = await fetch("https://exam.elevateegy.com/api/v1/subjects", {
          method: "GET",
          headers: {
            ...JSON_HEADER,
            token: accessToken as string,
          },
        });
    
        const data = await response.json();
        return NextResponse.json({data: data}, {status: 200})
      
}
