"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "./AuthModal";
import { useStore } from "@/zustand/store";
import { Bike, Car, ChevronRight, LogOut, Menu, Truck, X } from "lucide-react";
import { signOut } from "next-auth/react";
import logo from "../../public/logo.png";
const Nav_Items = ["Home", "Booking", "About Us", "Contact"];
function Nav() {
  const { user, setUser } = useStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  // logout FN
  const handleLogout = async () => {
    await signOut({ redirect: false });
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] `}
      >
        <div className="max-w-7xl mx-auto md:px-8 px-4 py-4 flex items-center justify-between">
          <Image src={logo} width={60} height={10} alt="logo" />
          <div className="hidden md:flex iten-center gap-10">
            {Nav_Items.map((i, idx) => {
              let href;
              if (i == "Home") {
                href = "/";
              } else {
                href = `/${i.toLowerCase()}`;
              }
              const active = href == pathName;

              return (
                <Link
                  key={idx}
                  href={href}
                  className={`text-sm font-medium transition ${
                    active ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {i}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 relative">
            <div className="hidden md:block relative">
              {!user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAuthOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-white text-black text-sm cursor-pointer font-semibold"
                >
                  Login
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white text-black font-bold text-xl"
                    onClick={() => setProfileOpen((p) => !p)}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-14 right-0 w-[300px] bg-white text-black rounded-2xl shadow-xl border"
                      >
                        <div className="p-5">
                          <p className="font-semibold text-lg">{user.name}</p>
                          <p className="text-sm uppercase text-gray-500 mb-4">
                            {user.role}
                          </p>
                          {user.role != "partner" && (
                            <div
                              className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl"
                              onClick={() =>
                                router.push("/partner/onboarding/vehicle")
                              }
                            >
                              <div className=" flex -space-x-2">
                                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                                  <Bike size={16} />
                                </div>
                                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                                  <Car size={16} />
                                </div>
                                <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                                  <Truck size={16} />
                                </div>
                              </div>
                              Become a Partner
                              <ChevronRight className="ml-auto" size={16} />
                            </div>
                          )}

                          <button
                            className="w-full flex items-center gap-2 py-3 hover:bg-gray-100 rounded-xl mt-2 cursor-pointer"
                            onClick={handleLogout}
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
            {/* Mobile View  */}
            <div className="md:hidden">
              {!user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAuthOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-white text-black text-sm cursor-pointer font-semibold"
                >
                  Login
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-full bg-white text-black font-bold text-xl"
                    onClick={() => setProfileOpen((p) => !p)}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </motion.button>
                </>
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen((p) => !p)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            {/* mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-[85px] left-1/2 -translate-x-1/2 w-[92%] bg-[#0B0B0B] rounded-2xl shadow-2xl z-40 md:hidden overflow-hidden"
            >
              <div className="flex flex-col divide-y divide-white/10">
                {Nav_Items.map((i, idx) => {
                  let href;
                  if (i == "Home") {
                    href = "/";
                  } else {
                    href = `/${i.toLowerCase()}`;
                  }

                  return (
                    <Link
                      key={idx}
                      href={href}
                      className="px-6 py-4 text-gray-300 hover:bg-white/5"
                    >
                      {i}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && user && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black z-30 md:hidden"
            />

            {/* mobile profile  */}
            <motion.div
              initial={{ y: 400 }}
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden"
            >
              <div className="p-5">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm uppercase text-gray-500 mb-4">
                  {user.role}
                </p>
                {user.role != "partner" && (
                  <div
                    className="w-full flex items-center gap-3 py-3 hover:bg-gray-100 rounded-xl"
                    onClick={() => router.push("/partner/onboarding/vehicle")}
                  >
                    <div className=" flex -space-x-2">
                      <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                        <Bike size={16} />
                      </div>
                      <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                        <Car size={16} />
                      </div>
                      <div className="w-6 h-6 flex justify-center items-center rounded-full bg-black text-white">
                        <Truck size={16} />
                      </div>
                    </div>
                    Become a Partner
                    <ChevronRight className="ml-auto" size={16} />
                  </div>
                )}

                <button
                  className="w-full flex items-center gap-2 py-3 hover:bg-gray-100 rounded-xl mt-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Nav;
