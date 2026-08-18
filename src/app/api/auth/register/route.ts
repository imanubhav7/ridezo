import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendMail } from "@/lib/sendMail";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectDB();
    let user = await User.findOne({
      email,
    });

    if (user && user.isEmailVerified) {
      return NextResponse.json(
        { message: "email already exist" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be greater than 6 characters" },
        { status: 400 },
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);
    if (user && !user.isEmailVerified) {
      ((user.name = name),
        (user.password = hashedPass),
        (user.email = email),
        (user.otp = otp),
        (user.otpExpires = otpExpires));
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPass,
        otp,
        otpExpires,
        isEmailVerified: false,
      });
    }

    // mail sent fn
    await sendMail(
      email,
      "Your OTP for Email Verification",
      `<h2>Your Email Verification OTP is <strong> ${otp} </strong> </h2>`,
    );

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log(process.env.MONGODB_URI);
    return NextResponse.json(
      { message: `error while ${error}` },
      { status: 500 },
    );
  }
}
