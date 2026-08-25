import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PartnerDashboard from "@/components/PartnerDashboard";
import PublicHome from "@/components/PublicHome";
import VehicleSlider from "@/components/VehicleSlider";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  await connectDB();
  const user = await User.findOne({
    email: session?.user?.email,
  });
  return (
    <div className="w-full min-h-screen bg-whilte text-black">
      <Nav />
      {user?.role == "partner" ? (
        <PartnerDashboard />
      ) : user?.role == "admin" ? (
        <AdminDashboard />
      ) : (
        <PublicHome />
      )}
      <Footer />
    </div>
  );
}
