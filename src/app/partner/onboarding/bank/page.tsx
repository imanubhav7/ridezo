"use client";
import { useCreateBankDetails } from "@/hooks/useCreateBankDetails";
import axios from "axios";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  CircleDashed,
  CreditCard,
  Landmark,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const page = () => {
  const createBankMutation = useCreateBankDetails();

  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    mobileNumber: "",
    upi: "",
  });

  const errorMsg = axios.isAxiosError(createBankMutation.error)
    ? createBankMutation.error.response?.data?.message
    : "Something went wrong";

  const handleBankDetails = () => {
    createBankMutation.mutate(bankDetails);
  };

  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute top-0 left-0 rounded-full h-9 w-9 flex items-center justify-center border border-gray-300 transition hover:bg-gray-100 "
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-xs text-gray-500 font-medium">Step 3 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Bank and Payout Setup</h1>
          <p className="text-sm mt-2 text-gray-500">Used for partner payout</p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="ahn"
              className="text-xs font-semibold text-gray-500"
            >
              Account holder name
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <BadgeCheck />
              </div>
              <input
                value={bankDetails.accountHolderName}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    accountHolderName: e.target.value,
                  }))
                }
                id="ahn"
                type="text"
                placeholder="As per bank record"
                className=" flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="ahn"
              className="text-xs font-semibold text-gray-500"
            >
              Account number
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <CreditCard />
              </div>
              <input
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    accountNumber: e.target.value,
                  }))
                }
                id="ahn"
                type="text"
                placeholder="Enter Account Number"
                className=" flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="ahn"
              className="text-xs font-semibold text-gray-500"
            >
              IFSC Code
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Landmark />
              </div>
              <input
                value={bankDetails.ifsc}
                onChange={(e) =>
                  setBankDetails((prev) => ({ ...prev, ifsc: e.target.value }))
                }
                id="ahn"
                type="text"
                placeholder="HDFC0001234"
                className=" flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="ahn"
              className="text-xs font-semibold text-gray-500"
            >
              Mobile Number
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-gray-400">
                <Phone />
              </div>
              <input
                value={bankDetails.mobileNumber}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    mobileNumber: e.target.value,
                  }))
                }
                id="ahn"
                type="text"
                placeholder="Enter your 10 digit mobile number"
                className=" flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="ahn"
              className="text-xs font-semibold text-gray-500"
            >
              UPI ID (optional)
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                value={bankDetails.upi}
                onChange={(e) =>
                  setBankDetails((prev) => ({ ...prev, upiId: e.target.value }))
                }
                id="ahn"
                type="text"
                placeholder="name@upi"
                className=" flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-xs mt-6 text-gray-500">
          <CheckCircle size={18} className="mt-0.5" />
          <p>
            Bank details are verified before first payout. This usually takes
            24-48 hours
          </p>
        </div>
        {createBankMutation.isError && (
          <p className="text-red-500 text-sm font-semibold mt-4">{errorMsg}</p>
        )}
        <motion.button
          onClick={handleBankDetails}
          disabled={createBankMutation.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 trasnsition cursor-pointer"
        >
          {createBankMutation.isPending ? (
            <CircleDashed className="animate-spin" />
          ) : (
            "Continue"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default page;
