import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 3,
      retryDelay: (attemp) => Math.min(1000 * 2 ** attemp, 30000),
    },
  },
});
