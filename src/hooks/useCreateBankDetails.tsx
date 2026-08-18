import { createBankDetails } from "@/app/services/bank";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBankDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBankDetails,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bank "],
      });
    },
  });
};
