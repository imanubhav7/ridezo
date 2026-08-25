"use client";
import useGetMe from "@/hooks/useGetMe";
import { useEffect, useState } from "react";
import { useStore } from "@/zustand/store";
import { motion } from "motion/react";
import { Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
type Step = {
  id: number;
  title: string;
  route?: string;
};

const STEPS: Step[] = [
  { id: 1, title: "Vehicle", route: "/partner/onboarding/vehicle" },
  { id: 2, title: "Document", route: "/partner/onboarding/documents" },
  { id: 3, title: "Bank", route: "/partner/onboarding/bank" },
  { id: 4, title: "Review" },
  { id: 5, title: "Video KYC" },
  { id: 6, title: "Pricing" },
  { id: 7, title: "Final Review" },
  { id: 8, title: "Live" },
];
const TOTAL_STEPS = STEPS.length;
const PartnerDashboard = () => {
  const router = useRouter();
  const { user } = useStore();
  const [activeSteps, setActiveSteps] = useState(0);

  useEffect(() => {
    if (user) {
      setActiveSteps(user.partnerOnboardingSteps + 1);
    }
  }, [user]);

  const goToStep = (step: Step) => {
    if (step.route && step.id <= activeSteps) {
      router.push(step.route);
    }
  };

  const progressPer = ((activeSteps - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 px-4 pt-28 pb-20">
      <div className="max-w-7xl mx-auto space-y-16">
        <div>
          <h1 className="text-4xl font-bold">Partner Onboarding</h1>
          <p className="text-gray-600 mt-3">
            Complete all steps to activate your account
          </p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl border overflow-x-auto">
          <div className="relative min-w-[800px]">
            <div className="absolute top-7 left-0 w-full h-[3px] bg-gray-200 rounded-full" />
            <motion.div
              animate={{ width: `${progressPer}%` }}
              transition={{ duration: 0.6 }}
              className="absolute top-7 left-0 h-[3px] bg-black rounded-full"
            />
            <div className="relative flex justify-between">
              {STEPS.map((step, idx) => {
                const completed = step.id < activeSteps;
                const active = step.id == activeSteps;
                const locked = step.id > activeSteps;
                return (
                  <motion.div
                    key={step.id}
                    whileHover={!locked ? { scale: 1.1 } : {}}
                    className="flex flex-col items-center z-10 cursor-pointer"
                    onClick={() => goToStep(step)}
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
                      ${completed ? "bg-black text-white border-black" : active ? "border-black bg-white " : "border-gray-300 text-gray-300 bg-white"}
                      `}
                    >
                      {completed ? (
                        <Check size={20} />
                      ) : locked ? (
                        <Lock size={20} />
                      ) : (
                        step.id
                      )}
                    </div>
                    <p className="font-semibold text-sm mt-3 text-center">
                      {step.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
