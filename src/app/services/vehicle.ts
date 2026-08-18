import axios from "axios";

export const getVehicle = async () => {
  try {
    const { data } = await axios.get("/api/partner/onboarding/vehicle");
    return data;
  } catch (error) {
    return error;
  }
};

export const createVehicle = async (vehicleData: {
  type: string;
  number: string;
  vehicleModel: string;
}) => {
  try {
    const { data } = await axios.post(
      "/api/partner/onboarding/vehicle",
      vehicleData,
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log("Create vehicle error:", error);
    throw error;
  }
};
