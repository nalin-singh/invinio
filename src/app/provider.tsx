"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { store } from "~/redux/store";

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <ClerkProvider>{children}</ClerkProvider>
    </Provider>
  );
};

export default ProviderWrapper;
