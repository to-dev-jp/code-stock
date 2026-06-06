import { SaveProvider } from "./provider/SaveProvider";
import { QueryProvider } from "./provider/QueryProvider";
import { FilterProvider } from "./provider/FilterProvider";
import { ModalsProvider } from "./provider/ModalsProvider";
import { WindowStateProvider } from "./provider/WindowStateProvider";
import { EditProvider } from "./provider/EditProvider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WindowStateProvider>
      <EditProvider>
        <FilterProvider>
          <QueryProvider>
            <SaveProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </SaveProvider>
          </QueryProvider>
        </FilterProvider>
      </EditProvider>
    </WindowStateProvider>
  );
};
