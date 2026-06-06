import { createContext, useContext } from "react";
import { useModals } from "../../hooks/useModals";

type ModalsContextValue = ReturnType<typeof useModals>;

const ModalsContext = createContext<ModalsContextValue | null>(null);

export const ModalsProvider = ({ children }: { children: React.ReactNode }) => {
  const modalsHook = useModals();

  return (
    <ModalsContext.Provider value={modalsHook}>
      {children}
    </ModalsContext.Provider>
  );
};

export const useModalsContext = () => {
  const ctx = useContext(ModalsContext);
  if (!ctx) {
    throw new Error("useModalsContext must be used within RefreshProvider");
  }
  return ctx;
};
