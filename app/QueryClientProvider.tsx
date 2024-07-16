"use client";

import {
  QueryClient,
  QueryClientProvider as ReactClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <ReactClientProvider client={queryClient}>{children}</ReactClientProvider>
  );
};

export default QueryClientProvider;
