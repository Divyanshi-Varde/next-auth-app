import { connect } from "@/config/dbConfig";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";

connect();

const secret_key=process.env.TOKEN_SECRET as Secret;


export async function POST(request:NextRequest){
    try{

        const reqBody= await request.json()
        const {email,password}=reqBody
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({message:"User doesn't exist!",status:400})
        }

        console.log(user);

        const validPassword=await bcrypt.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Check your credentials",status:400})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,secret_key,{expiresIn:"1h"})

        const response=NextResponse.json({message:"Logged in successfully",success:true})

        response.cookies.set("token",token,{
            httpOnly:true
        });

        return response

    }catch(error:any){
        return NextResponse.json({error:error.message,status:500})
    }
}