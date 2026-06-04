// 型宣言
import { ElectronWindow } from "../types/types";

import { useState } from "react";

declare const window: ElectronWindow;

export const useInit = () => {
  const [isMax, setIsMax] = useState(false); //ウィンドウが最大化されているか

  // 起動時にウィンドウが最大化されているか
  const getIsMaximized = async () => {
    const isMaximized = await window.dbOp.isMaximized();
    setIsMax(isMaximized);
  };

  // ウィンドウの最大・最小化
  const handleMaximize = async () => {
    const isMaximized = await window.dbOp.isMaximized();
    if (isMaximized) {
      setIsMax(false);
      window.dbOp.unmaximizeWindow();
    } else {
      setIsMax(true);
      window.dbOp.maximizeWindow();
    }
  };

  const closeWindow = () => {
    window.dbOp.closeWindow();
  };

  const minimizeWindow = () => {
    window.dbOp.minimizeWindow();
  };

  return {
    getIsMaximized,
    isMax,
    handleMaximize,
    closeWindow,
    minimizeWindow,
  };
};
