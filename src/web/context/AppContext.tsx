import { createContext, useContext, useState } from "react";
import { useCodes, useLangsAndTags, useHandleData } from "../hooks/useCodes";
import { useModals } from "../hooks/useModals";
import { useInit } from "../hooks/useInitialize";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const codesHook = useCodes();
  const langsAndTagsHook = useLangsAndTags();
  const handleDataHook = useHandleData({
    refleshCodes: codesHook.refleshCodes,
    refleshLangsAndTags: langsAndTagsHook.refleshLangsAndTags,
  });
  const modalsHook = useModals();
  const initHook = useInit();

  return (
    <AppContext.Provider
      value={{
        ...codesHook,
        ...langsAndTagsHook,
        ...handleDataHook,
        ...modalsHook,
        ...initHook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
