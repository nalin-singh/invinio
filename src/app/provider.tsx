"use client";

import { ClerkProvider, SignedOut, SignIn } from "@clerk/nextjs";
import { Provider } from "react-redux";
import { TooltipProvider } from "~/components/atoms/tooltip";
import { store } from "~/redux/store";

export const ProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <ClerkProvider>
          <SignedOut>
            <SignIn />
          </SignedOut>
          {children}
        </ClerkProvider>
      </TooltipProvider>
    </Provider>
  );
};

export default ProviderWrapper;
