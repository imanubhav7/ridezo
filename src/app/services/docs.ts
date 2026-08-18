import axios from "axios";

export const uploadDocs = async (formdata: FormData) => {
  try {
    const { data } = await axios.post(
      "/api/partner/onboarding/documents",
      formdata,
    );
    console.log(data);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("Message:", error.response?.data?.message);
    }

    throw error;
  }
};
