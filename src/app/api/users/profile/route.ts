import { connect } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/utils/getData";
import User from "@/models/userModels";

connect();

export async function POST(request:NextRequest){
  try {

    const userID=await getData(request);
    const user= await User.findOne({_id:userID}).select("-password")  // using - so that password field is not selected
    return NextResponse.json({
      message:"User found",
      data:user
    })

  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
