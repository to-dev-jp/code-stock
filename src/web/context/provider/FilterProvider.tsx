import { createContext, useContext } from "react";
import { useFilter } from "../../hooks/useFilter";

type FilterContextValue = ReturnType<typeof useFilter>;

const FilterContext = createContext<FilterContextValue | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const filterHook = useFilter();

  return (
    <FilterContext.Provider value={filterHook}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilterContext must be used within FilterProvider");
  }
  return ctx;
};
