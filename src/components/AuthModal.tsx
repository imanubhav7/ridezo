"use client";
import { Circle, CircleDashed, Lock, Mail, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

type propType = {
  open: boolean;
  onClose: () => void;
};
type stepType = "login" | "signup" | "otp";
function AuthModal({ open, onClose }: propType) {
  const [step, setStep] = useState<stepType>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // const { data } = useSession();
  // console.log(data);

  // Sign Up fn
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      // console.log(data);
      setError("");
      setStep("otp");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message ?? "Something went wrong");
    }
  };

  // Email verification fn

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/verify-email", {
        email,
        otp: otp.join(""),
      });
      console.log(data);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setStep("login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message ?? "Something went wrong");
      console.log(error);
    }
  };

  // Sign In fn
  const handleLogin = async () => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    setLoading(false);
  };

  // google login fn
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  // OTP fn
  const handleChangeOtp = async (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[idx] = value;
    setOtp(updated);

    if (value && idx < otp.length - 1) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    } else if (!value && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  // resend otp fn
  const handleResendOtp = async () => {
    if (timer > 0) return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/resend-otp", {
        email,
      });
      console.log(data);
      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
      setError("");
    } catch (error: any) {
      setError(error.response.data.message ?? "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md rounded-3xl bg-white border border-black/10 shadow-[0_40_100px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-black">
                <div
                  className="absolute right-4 top-4 text-gray-400 hover:text-black transition cursor-pointer"
                  onClick={onClose}
                >
                  <X size={20} />
                </div>

                <div className="mb-6 text-center">
                  <h1 className="text-3xl font-extrabold tracking-widest">
                    Ridezo
                  </h1>
                  <p className="mt-1 text-xs text-gray-400">
                    Premium Vehicle Booking
                  </p>
                </div>
                <div>
                  <button
                    className="w-full h-11 rounded-full border border-gray-400 flex justify-center items-center gap-3 text-sm font-semibold hover:bg-black hover:text-white transition cursor-pointer"
                    onClick={handleGoogleLogin}
                  >
                    <Image
                      src={"/google.png"}
                      alt="google"
                      width={20}
                      height={20}
                    />
                    Continue with Google
                  </button>
                </div>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-black/10" />
                  <div className="text-sm text-gray-500">OR</div>
                  <div className="flex-1 h-px bg-black/10" />
                </div>
                <div>
                  {/* Login Flow  */}
                  {step == "login" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Welcome Back</h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent outline-none text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-transparent outline-none text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <button
                          className="w-full rounded-xl h-11 bg-black text-white font-semibold hover:bg-gray-900 cursor-pointer transition flex justify-center items-center"
                          onClick={handleLogin}
                          disabled={loading}
                        >
                          {!loading ? (
                            "Login"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>
                      <p className="mt-6 text-center text-sm text-gray-500 ">
                        Don't have an account?
                        <div
                          onClick={() => setStep("signup")}
                          className="text-black cursor-pointer font-medium hover:underline"
                        >
                          Sign Up
                        </div>
                      </p>
                    </motion.div>
                  )}

                  {/* SignUp flow  */}

                  {step == "signup" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h1 className="text-xl font-semibold">Create Account</h1>
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <User size={18} className="text-gray-500" />
                          <input
                            type="text"
                            placeholder="Enter your Name"
                            className="w-full bg-transparent outline-none text-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Mail size={18} className="text-gray-500" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent outline-none text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-3 border border-black/20 rounded-xl px-4 py-3">
                          <Lock size={18} className="text-gray-500" />
                          <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-transparent outline-none text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        {error && (
                          <p className="text-red-500 text-sm uppercase">
                            {error} !
                          </p>
                        )}
                        <button
                          className="w-full rounded-xl h-11 bg-black text-white font-semibold hover:bg-gray-900 cursor-pointer transition flex justify-center items-center"
                          disabled={loading}
                          onClick={handleSignUp}
                        >
                          {!loading ? (
                            "Send Otp"
                          ) : (
                            <CircleDashed
                              size={18}
                              color="white"
                              className="animate-spin"
                            />
                          )}
                        </button>
                      </div>
                      <p className="mt-6 text-center text-sm text-gray-500 ">
                        Already have an account?
                        <div
                          onClick={() => setStep("login")}
                          className="text-black cursor-pointer font-medium hover:underline"
                        >
                          Login
                        </div>
                      </p>
                    </motion.div>
                  )}

                  {/* OTP flow  */}

                  {step == "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-semibold">Verify Email</h2>

                      <div className="flex justify-between mt-6 gap-2">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            id={`otp-${i}`}
                            value={digit}
                            maxLength={1}
                            className="w-10 h-12 sm:w-12 text-center text-lg font-semibold rounded-xl bg-white border border-black/20 outline-none  "
                            onChange={(e) => handleChangeOtp(i, e.target.value)}
                          />
                        ))}
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm uppercase">
                          {error} !
                        </p>
                      )}

                      {/* Resend OTP btn  */}
                      <button
                        className="mt-2 cursor-pointer hover:underline text-sm font-semibold transition"
                        disabled={loading || timer > 0}
                        onClick={handleResendOtp}
                      >
                        {timer > 0 ? `Wait ${timer}s` : "Resend OTP"}
                      </button>

                      <button
                        className="w-full mt-6 h-11 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition cursor-pointer flex justify-center items-center"
                        disabled={loading}
                        onClick={handleVerifyEmail}
                      >
                        {!loading ? (
                          "Verify and Create Account"
                        ) : (
                          <CircleDashed
                            size={18}
                            color="white"
                            className="animate-spin"
                          />
                        )}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
