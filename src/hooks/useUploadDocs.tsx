import { uploadDocs } from "@/app/services/docs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUploadDocs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadDocs,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
};
