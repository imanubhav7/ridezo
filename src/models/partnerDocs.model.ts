import mongoose from "mongoose";

interface IPartnerDocs {
  owner: mongoose.Types.ObjectId;
  aadharUrl: string;
  rcUrl: string;
  licenseUrl: string;
  status: "approved" | "pending" | "rejected";
  rejectionReason: string;
  createdAt: Date;
  UpdatedAt: Date;
}
const partnerDocsSchema = new mongoose.Schema<IPartnerDocs>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    aadharUrl: {
      type: String,
    },
    rcUrl: {
      type: String,
    },
    licenseUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: "pending",
    },
    rejectionReason: String,
  },
  { timestamps: true },
);

const PartnerDocs =
  mongoose.models.PartnerDocs ||
  mongoose.model("PartnerDocs", partnerDocsSchema);
export default PartnerDocs;
