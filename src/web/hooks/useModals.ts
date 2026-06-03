import { useState } from "react";
import { DisplayData } from "../types/types";
import { blankData } from "../const/const";

export const useModals = () => {
  const [currentModal, setCurrentModal] = useState({
    is: "create",
    isOpen: false,
  });

  const [displayData, setDisplayData] = useState<DisplayData>(blankData);

  return { currentModal, setCurrentModal, displayData, setDisplayData };
};
