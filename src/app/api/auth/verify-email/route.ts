import connectDB from "@/lib/db";
import User from "@/models/user.model";
// import { use } from "react";

export async function POST (req:Request){
    try {
        await connectDB();
        const{email, otp} = await req.json();

        if(!email && !otp){
            return Response.json(
                {message: "Email and OTP required"},
                {status:400}
            )
        }

        let user = await User.findOne({email})
        if(!user){
            return Response.json(
                {message: "User not found"},
                {status: 400}
            )
        }

        if(user.isEmailVerified){
            return Response.json(
                {message: "Email is already verified"},
                {status : 400}
            )
        }

        if(!user.otpExpires || user.otpExpires<new Date()){
            return Response.json(
                {message : "Otp has expired"},
                {status : 400}
            )
        }

        if(!user.otp || user.otp != otp){
            return Response.json(
                {message: "Invalid OTP"},
                {status: 400}
            )
        }
        
        user.isEmailVerified = true;
        user.otp = undefined
        user.otpExpires = undefined

        await user.save();

        return Response.json(
            {message: "Email is verified"},
            {status : 200}
        )

    } catch (error) {
            return Response.json(
                {message : `verify email error ${error}`},
                {status : 500}
            )
    }
}