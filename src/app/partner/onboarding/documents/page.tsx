"use client";
import { useUploadDocs } from "@/hooks/useUploadDocs";
import axios from "axios";
import { ArrowLeft, CircleDashed, FileCheck, UploadCloud } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type docsType = "aadhar" | "license" | "rc";
const page = () => {
  const [docs, setDocs] = useState<Record<docsType, File | null>>({
    aadhar: null,
    license: null,
    rc: null,
  });
  const [validateError, setValidateError] = useState<string>("");
  const uploadMutation = useUploadDocs();

  const errorMsg = axios.isAxiosError(uploadMutation.error)
    ? uploadMutation.error.response?.data?.message
    : "Something went wrong";

  const handleUpload = () => {
    if (!docs.aadhar || !docs.license || !docs.rc) {
      setValidateError("Please upload all the documents");
      return;
    }

    setValidateError("");
    const formdata = new FormData();
    formdata.append("aadhar", docs.aadhar);
    formdata.append("license", docs.license);
    formdata.append("rc", docs.rc);

    uploadMutation.mutate(formdata);
  };

  const handleImg = (doc: docsType, file: File | null) => {
    if (!file) return;

    setDocs((prev) => ({ ...prev, [doc]: file }));
  };

  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.04 }}
        className="w-full max-w-xl bg-white rounded-3xl border border-gray-300 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8"
      >
        <div className="relative text-center">
          <button
            onClick={() => router.back()}
            className="absolute top-0 left-0 rounded-full h-9 w-9 flex items-center justify-center border border-gray-300 transition hover:bg-gray-100 "
          >
            <ArrowLeft size={18} />
          </button>
          <p className="text-xs text-gray-500 font-medium">Step 2 of 3</p>
          <h1 className="text-2xl font-bold mt-1">Upload Documents</h1>
          <p className="text-sm mt-2 text-gray-500">
            Required for verification
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <motion.label
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-300 cursor-pointer hover:border-black transition"
          >
            <div>
              <p className="text-sm font-semibold">Adhaar /ID Proof</p>
              <p className="text-xs text-gray-500">Government Issued ID</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Upload</span>
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white
              "
              >
                <UploadCloud size={18} />
              </div>
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImg("aadhar", e.target?.files?.[0] || null)
              }
            />
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-300 cursor-pointer hover:border-black transition"
          >
            <div>
              <p className="text-sm font-semibold">Driving License</p>
              <p className="text-xs text-gray-500">Valid driving license</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Upload</span>
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white
              "
              >
                <UploadCloud size={18} />
              </div>
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) =>
                handleImg("license", e.target?.files?.[0] || null)
              }
            />
          </motion.label>
          <motion.label
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-300 cursor-pointer hover:border-black transition"
          >
            <div>
              <p className="text-sm font-semibold">Vehicle RC</p>
              <p className="text-xs text-gray-500">Registration Certificate</p>
            </div>
            <div>
              <span className="text-xs text-gray-400">Upload</span>
              <div
                className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white
              "
              >
                <UploadCloud size={18} />
              </div>
            </div>

            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) => handleImg("rc", e.target?.files?.[0] || null)}
            />
          </motion.label>
        </div>

        <div className="mt-6 flex items-start gap-3  text-xs text-gray-500">
          <FileCheck size={16} className="mt-0.5" />
          <p>Document are securly stored and manually verified by our team</p>
        </div>

        {validateError && (
          <p className="text-sm text-red-500 font-semibold">{validateError}</p>
        )}

        {uploadMutation.isError && (
          <p className="text-sm text-red-500 font-semibold">{errorMsg}</p>
        )}
        <motion.button
          disabled={uploadMutation.isPending}
          onClick={handleUpload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 trasnsition cursor-pointer"
        >
          {uploadMutation.isPending ? (
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
