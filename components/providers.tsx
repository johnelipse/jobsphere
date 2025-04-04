"use client";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@mosespace/toast";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
  session?: any; // Optional session prop
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <SessionProvider session={session}>
        {children}
        <Toaster position="bottom-right" />
      </SessionProvider>
    </ReactQueryProvider>
  );
}
