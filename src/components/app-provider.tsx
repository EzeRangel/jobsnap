"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import fetcher from "~/lib/fetcher/fetcher";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 1000,
          keepPreviousData: false,
        }}
      >
        {children}
      </SWRConfig>
    </>
  );
}
