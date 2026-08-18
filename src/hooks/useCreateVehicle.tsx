import { createVehicle } from "@/app/services/vehicle";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVehicle,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vehicle"],
      });
    },
  });
};
