import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PublicHome from "@/components/PublicHome";
import VehicleSlider from "@/components/VehicleSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-whilte text-black">
      <Nav />
      <PublicHome />
      <Footer />
    </div>
  );
}
