// 画像URL
import logo from "../../assets/code-stock.png";
import close from "../../assets/close.png";
import min from "../../assets/minimize.png";
import max from "../../assets/maximize.png";
import unmax from "../../assets/unmaximize.png";
import { useAppContext } from "../context/AppContext";

export default function TitleBar() {
  const { isMax, handleMaximize, closeWindow, minimizeWindow } =
    useAppContext();
  return (
    <div className="titleBar">
      <div className="titleBarBox">
        <div className="titleWrap">
          <div className="titleBox">
            <img src={logo} width={20} height={20} />
            <h1 className="title">Code Stock</h1>
          </div>
          <div className="titleMenuWrap">
            <button className="headerItem" title="COMING SOON...">
              File
            </button>
            <button className="headerItem" title="COMING SOON...">
              Settings
            </button>
            <button className="headerItem" title="COMING SOON...">
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
    </div>
  );
}
