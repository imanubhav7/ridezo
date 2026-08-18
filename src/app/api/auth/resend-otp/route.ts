import connectDB from "@/lib/db";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  try {
    const { email } = await req.json();
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.isEmailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendMail(
      email,
      "Your OTP for Email Verification",
      `<h2>Your Email Verification OTP is <strong> ${otp} </strong> </h2>`,
    );

    return NextResponse.json({ message: "OTP resend successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
