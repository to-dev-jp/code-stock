import { createContext, useContext } from "react";
import { useSaveCode } from "../../hooks/useSaveCode";

type SaveContextValue = ReturnType<typeof useSaveCode>;

const SaveContext = createContext<SaveContextValue | null>(null);

export const SaveProvider = ({ children }: { children: React.ReactNode }) => {
  const saveHook = useSaveCode();

  return (
    <SaveContext.Provider value={saveHook}>{children}</SaveContext.Provider>
  );
};

export const useSaveContext = () => {
  const ctx = useContext(SaveContext);
  if (!ctx) {
    throw new Error("useSaveContext must be used within SaveProvider");
  }
  return ctx;
};
