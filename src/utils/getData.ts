import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

const secret_key = process.env.TOKEN_SECRET as Secret;

export const getData = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, secret_key);

    return decodedToken.id;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
};
