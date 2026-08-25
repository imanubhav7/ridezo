import mongoose from "mongoose";

interface IVehicle {
  owner: mongoose.Types.ObjectId;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  mobileNumber: string;
  upi?: string;
  status: "not_added" | "added" | "verified";
  createdAt: Date;
  UpdatedAt: Date;
}
const partnerBankSchema = new mongoose.Schema<IVehicle>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
      uppercase: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    upi: {
      type: String,
    },
    status: {
      type: String,
      enum: ["not_added", "added", "verified"],
      default: "not_added",
    },
  },
  { timestamps: true },
);

const PartnerBank =
  mongoose.models.PartnerBank ||
  mongoose.model("PartnerBank", partnerBankSchema);
export default PartnerBank;
