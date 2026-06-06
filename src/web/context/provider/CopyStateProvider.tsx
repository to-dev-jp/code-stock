import { createContext, useContext } from "react";
import { useCopyState } from "../../hooks/useCopyState";

type CopyContextValue = ReturnType<typeof useCopyState>;

const CopyContext = createContext<CopyContextValue | null>(null);

export const CopyProvider = ({ children }: { children: React.ReactNode }) => {
  const copyHook = useCopyState();

  return (
    <CopyContext.Provider value={copyHook}>{children}</CopyContext.Provider>
  );
};

export const useCopyContext = () => {
  const ctx = useContext(CopyContext);
  if (!ctx) {
    throw new Error("useCopyContext must be used within CopyProvider");
  }
  return ctx;
};
