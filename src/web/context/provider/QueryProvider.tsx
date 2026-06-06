import { createContext, useContext } from "react";
import { useQueries } from "../../hooks/useQueries";

type QueryContextValue = ReturnType<typeof useQueries>;

const QueryContext = createContext<QueryContextValue | null>(null);

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryHook = useQueries();

  return (
    <QueryContext.Provider value={queryHook}>{children}</QueryContext.Provider>
  );
};

export const useQueryContext = () => {
  const ctx = useContext(QueryContext);
  if (!ctx) {
    throw new Error("useQueryContext must be used within RefreshProvider");
  }
  return ctx;
};
