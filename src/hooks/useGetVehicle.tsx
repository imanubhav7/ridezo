import { getVehicle } from "@/app/services/vehicle";
import { useQuery } from "@tanstack/react-query";

export const useGetVehicle = () => {
  return useQuery({
    queryKey: ["vehicle"],
    queryFn: getVehicle,
  });
};
