"use client";
import { useCreateVehicle } from "@/hooks/useCreateVehicle";
import axios from "axios";
import {
  ArrowLeft,
  Bike,
  Car,
  CircleDashed,
  Package,
  Truck,
} from "lucide-react";
import { motion, number } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VEHICLE = [
  { id: "bike", lable: "Bike", icon: Bike, desc: "2 Wheeler" },
  { id: "auto", lable: "Auto", icon: Car, desc: "3 Wheeler" },
  { id: "car", lable: "Car", icon: Car, desc: "4 Wheeler" },
  { id: "loading", lable: "Loading", icon: Package, desc: "Small goods" },
  { id: "truck", lable: "Truck", icon: Truck, desc: "Heavy Transport" },
];

const page = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const router = useRouter();

  const createVehicleMutation = useCreateVehicle();
  const errorMsg = axios.isAxiosError(createVehicleMutation.error)
    ? createVehicleMutation.error.response?.data?.message
    : "Something went wrong";

  const handleVehicle = async () => {
    createVehicleMutation.mutate({
      type: vehicleType,
      number: vehicleNumber,
      vehicleModel,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15) p-6 sm:p-8"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute top-0 left-0 rounded-full h-9 w-9 flex items-center justify-center border border-gray-300 transition hover:bg-gray-100 "
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-xs text-gray-500 font-medium">Step 1 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Vehicle Details</h1>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-3">
              Vehicle Type
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {VEHICLE.map((v, i) => {
                const Icon = v.icon;
                const active = vehicleType == v.id;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-2xl border p-4 flex flex-col items-center gap-2 transition ${active ? "bg-black text-white border-black" : " border-gray-200 hover:border-black"}`}
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${active ? "bg-white text-black" : "bg-black text-white"}`}
                    >
                      <Icon />
                    </div>
                    <div className="text-sm font-semibold">{v.lable}</div>
                    <p
                      className={`text-xs ${active ? "text-gray-300" : "text-gray-500"}`}
                    >
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="vn">
              Vehicle Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              id="vn"
              placeholder="MP20AB2344"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transtion"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500" htmlFor="vm">
              Vehicle Model
            </label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              id="vm"
              placeholder="Tata Ace"
              className="mt-2 w-full border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transtion"
            />
          </div>
        </div>

        {createVehicleMutation.isError && (
          <p className="text-red-500 text-sm font-semibold mt-4">{errorMsg}</p>
        )}

        <motion.button
          disabled={createVehicleMutation.isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 trasnsition cursor-pointer"
          onClick={handleVehicle}
        >
          {createVehicleMutation.isPending ? (
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
