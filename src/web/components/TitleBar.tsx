// 画像URL
import logo from "../../assets/code-stock.png";
import close from "../../assets/close.png";
import min from "../../assets/minimize.png";
import max from "../../assets/maximize.png";
import unmax from "../../assets/unmaximize.png";
import { ElectronWindow } from "../types/types";
import { useState } from "react";
import ThemeModal from "./modals/ThemeModal";
import HelpModal from "./modals/HelpModal";
import { useWindowState } from "../hooks/useWindowState";

declare const window: ElectronWindow;

export default function TitleBar() {
  const { isMax, handleMaximize, closeWindow, minimizeWindow } =
    useWindowState();
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <div className="titleBar">
      <div className="titleBarBox">
        <div className="titleWrap">
          <div className="titleBox">
            <img src={logo} width={20} height={20} />
            <h1 className="title">Code Stock</h1>
          </div>
          <div className="titleMenuWrap">
            <button
              onClick={async () => {
                const res = await window.dbOp.exportCodes();
                if (res.success) {
                  // 成功通知（トーストなど）
                  console.log("success");
                } else {
                  // res.error を表示
                  console.log(res.error);
                }
              }}
              className="headerItem"
              title="JSONファイルをエクスポート"
            >
              Export
            </button>
            <button
              className="headerItem"
              title="シンタックスハイライトカラーの変更"
              onClick={() => {
                setIsThemeModalOpen(true);
                setIsHelpModalOpen(false);
              }}
            >
              Settings
            </button>
            <button
              className="headerItem"
              title="ヘルプ"
              onClick={() => {
                setIsHelpModalOpen(true);
                setIsThemeModalOpen(false);
              }}
            >
              Help
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }} />
        <div className="layoutBox">
          <button onClick={minimizeWindow}>
            <img src={min} width={12} height={12} />
          </button>
          <button onClick={handleMaximize}>
            <img src={isMax ? unmax : max} width={12} height={12} />
          </button>
          <button onClick={closeWindow}>
            <img
              src={close}
              style={{ filter: "opacity(0.7)" }}
              width={11}
              height={11}
            />
          </button>
        </div>
      </div>
      <ThemeModal
        isOpen={isThemeModalOpen}
        setIsModalOpen={setIsThemeModalOpen}
      />
      <HelpModal isOpen={isHelpModalOpen} setIsModalOpen={setIsHelpModalOpen} />
    </div>
  );
}
