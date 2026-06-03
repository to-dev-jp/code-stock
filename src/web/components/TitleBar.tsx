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
    <div
      className="titleBar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="titleBarBox"
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns:
            "var(--title-box-width) auto var(--layout-box-width)",
        }}
      >
        <div
          className="titleBox"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img src={logo} width={20} height={20} />
            <h1 className="title">Code Stock</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              className="headerItem"
              title="COMING SOON..."
              style={{ border: "none" }}
            >
              File
            </button>
            <button
              className="headerItem"
              title="COMING SOON..."
              style={{ border: "none" }}
            >
              Settings
            </button>
            <button
              className="headerItem"
              title="COMING SOON..."
              style={{ border: "none" }}
            >
              Help
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }} />
        <div
          className="layoutBox"
          style={{
            width: "100%",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <button style={{ border: "none" }} onClick={minimizeWindow}>
            <img src={min} width={12} height={12} />
          </button>
          <button style={{ border: "none" }} onClick={handleMaximize}>
            <img src={isMax ? unmax : max} width={12} height={12} />
          </button>
          <button style={{ border: "none" }} onClick={closeWindow}>
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
