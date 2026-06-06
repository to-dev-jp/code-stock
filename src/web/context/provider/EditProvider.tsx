import { createContext, useContext } from "react";
import { useEditCode } from "../../hooks/useEditCode";

type EditContextValue = ReturnType<typeof useEditCode>;

const EditContext = createContext<EditContextValue | null>(null);

export const EditProvider = ({ children }: { children: React.ReactNode }) => {
  const editHook = useEditCode();

  return (
    <EditContext.Provider value={editHook}>{children}</EditContext.Provider>
  );
};

export const useEditContext = () => {
  const ctx = useContext(EditContext);
  if (!ctx) {
    throw new Error("useEditContext must be used within EditProvider");
  }
  return ctx;
};
