import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await auth();
    if (!session || !session.user?.email || session.user?.role !== "admin") {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }
    const totalPartners = await User.countDocuments({
      role: "partner",
    });
    const totalApprovedPartners = await User.countDocuments({
      partnerStatus: "approved",
    });
    const totalPendingPartners = await User.countDocuments({
      partnerStatus: "pending",
    });
    const totalRejectedPartners = await User.countDocuments({
      partnerStatus: "rejected",
    });

    const pendingPartnerReviews = await User.find({
        role:"partner",
        partnerStatus:"pending",
        partnerOnboardingSteps: 3, 
    })
    const partnerIds = pendingPartnerReviews.map((p) => p._id)
    const pendingVehicles = await Vehicle.find({
        owner: {$in:partnerIds}
    })
    const 

  } catch (error) {}
}
