import { QueryClient } from "@tanstack/react-query";

export const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5min
      gcTime: 10 * 60 * 1000, //10mins
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
