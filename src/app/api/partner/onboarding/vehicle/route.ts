import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";

const VEHICLE_REGEX =
  /^(?:[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,3}[ -]?[0-9]{1,4}|[0-9]{2}[ -]?BH[ -]?[0-9]{4}[ -]?[A-Z]{2})$/i;

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 400 });
    }
    const { type, number, vehicleModel } = await req.json();
    if (!type || !number || !vehicleModel) {
      return Response.json(
        { message: "Missing required details" },
        { status: 400 },
      );
    }

    if (!VEHICLE_REGEX.test(number)) {
      return Response.json(
        { message: "Invalid vehicle number format" },
        { status: 400 },
      );
    }

    const vehicleNum = number.toUpperCase();
    const duplicate = await Vehicle.findOne({ number: vehicleNum });
    if (duplicate) {
      return Response.json(
        { message: "Vehicle already registered with this number" },
        { status: 400 },
      );
    }

    let vehicle = await Vehicle.findOne({
      owner: user._id,
    });
    if (vehicle) {
      ((vehicle.type = type),
        (vehicle.number = vehicleNum),
        (vehicle.vehicleModel = vehicleModel),
        (vehicle.status = "pending"));
      await vehicle.save();
      return Response.json(vehicle, { status: 200 });
    }
    vehicle = await Vehicle.create({
      owner: user._id,
      type,
      number: vehicleNum,
      vehicleModel,
    });

    if (user.partnerOnboardingSteps < 1) {
      user.partnerOnboardingSteps = 1;
    }
    user.role = "partner";
    await user.save();
    return Response.json(vehicle, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `vehicle error ${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 400 });
    }
    let vehicle = await Vehicle.findOne({
      owner: user._id,
    });
    if (vehicle) {
      return Response.json(vehicle, { status: 200 });
    } else {
      return Response.json(null, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: `get vehicle error ${error}` },
      { status: 500 },
    );
  }
}
