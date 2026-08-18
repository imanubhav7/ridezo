import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials, request) {
        if (!credentials.email || !credentials.password) {
          throw Error("missing credentials");
        }
        const email = credentials.email;
        const password = credentials.password as string;
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw Error("User does not exist");
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
          throw Error("Password is not valid");
        }
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider == "google") {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          await User.create({
            name: user.name,
            email: user.email,
          });
        }
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        ((token.name = user.name),
          (token.email = user.email),
          (token.id = user.id),
          (token.role = user.role));
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        ((session.user.name = token.name),
          (session.user.id = token.id),
          (session.user.email = token.email),
          (session.user.role = token.role));
      }
      return session;
    },
  },
  pages: {
    signIn: "/signIn",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
});
