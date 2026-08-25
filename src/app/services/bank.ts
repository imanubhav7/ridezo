import axios from "axios";

interface Banktype {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  mobileNumber: string;
  upi?: string;
}

export const createBankDetails = async (bankData: Banktype) => {
  try {
    const { data } = await axios.post("/api/partner/onboarding/bank", bankData);
    console.log(data);
    return data;
  } catch (error) {
    console.log("Bank Error", error);
    throw error;
  }
};

export const getBankDetails = async () => {
  try {
    const { data } = await axios.get("/api/partner/onboarding/bank");
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Bank Details Error", error);
    throw error;
  }
};
