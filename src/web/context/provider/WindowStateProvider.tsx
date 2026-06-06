import { createContext, useContext } from "react";
import { useWindowState } from "../../hooks/useWindowState";

type WindowStateContextValue = ReturnType<typeof useWindowState>;

const WindowStateContext = createContext<WindowStateContextValue | null>(null);

export const WindowStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const refreshHook = useWindowState();

  return (
    <WindowStateContext.Provider value={refreshHook}>
      {children}
    </WindowStateContext.Provider>
  );
};

export const useWindowStateContext = () => {
  const ctx = useContext(WindowStateContext);
  if (!ctx) {
    throw new Error(
      "useWindowStateContext must be used within WindowStateProvider",
    );
  }
  return ctx;
};
