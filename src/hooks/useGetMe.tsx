import { getMe } from "@/app/services/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useStore } from "@/zustand/store";

export default function useGetMe(enabled: boolean) {
  const setUser = useStore((state: any) => state.setUser);
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);
  return query;
}
