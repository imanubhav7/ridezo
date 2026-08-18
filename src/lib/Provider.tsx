"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryclient } from "../lib/react-query";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
