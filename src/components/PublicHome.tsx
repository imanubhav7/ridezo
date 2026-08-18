"use client"
import React, { useState } from "react";
import HeroSec from "./HeroSec";
import VehicleSlider from "./VehicleSlider";
import AuthModal from "./AuthModal";

function PublicHome() {
    const[authOpen, setAuthOpen] = useState(false)
  return (
    <>
      <HeroSec onAuthReq={() => setAuthOpen(true)} />
      <VehicleSlider />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default PublicHome;
