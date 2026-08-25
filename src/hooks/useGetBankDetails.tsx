import { getBankDetails } from "@/app/services/bank";
import { useQuery } from "@tanstack/react-query";

export const useGetBankDetails = () => {
  return useQuery({
    queryKey: ["bankDetails"],
    queryFn: getBankDetails,
  });
};
