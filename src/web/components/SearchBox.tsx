import React from "react";
import { useAppContext } from "../context/AppContext";

export default function SearchBox({
  listStyle,
  setListStyle,
}: {
  listStyle: string;
  setListStyle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { searchCodes, setCurrentModal } = useAppContext();

  return (
    <div className="searchContainer">
      <div
        className="searchBox"
        style={{
          display: "grid",
          width: "calc(100% - 2*var(--search-side-gap))",
          gridTemplateColumns:
            "calc(2*(var(--style-box-side) + var(--style-box-padding)) + var(--style-box-gap)) auto var(--search-menu-button) var(--search-menu-button)",
        }}
      >
        <div
          className="styleChangeContainer"
          style={{
            width: "100%",
            height: "calc(var(--style-box-side) + 2*var(--style-box-padding))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "var(--border-main-color)",
          }}
        >
          <div
            className="styleChangeBox"
            style={{
              gap: "var(--style-box-gap)",
              width: "calc(2px + 2*var(--style-box-side))",
              height: "var(--style-box-side)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className={
                listStyle === "grid" ? "styleGridBox selected" : "styleGridBox"
              }
              onClick={() => {
                setListStyle("grid");
              }}
            >
              ⊞
            </div>
            <div
              className={
                listStyle === "flex" ? "styleFlexBox selected" : "styleFlexBox"
              }
              onClick={() => {
                setListStyle("flex");
              }}
            >
              ☰
            </div>
          </div>
        </div>
        <div className="searchWindow">
          <div className="searchWindowBox">
            <input
              className="searchWindowText"
              placeholder="コードを検索..."
              onChange={(e) => {
                const { target } = e;
                searchCodes(target.value);
              }}
              style={{
                padding: "0 14px",
                border: "none",
                background: "none",
                width: "calc(100% - 28px)",
                height: "100%",
                margin: "0",
              }}
            />
          </div>
        </div>
        <button
          className="searchRunButton"
          style={{
            background: "var(--theme-sub-green)",
          }}
          onClick={() => {
            setCurrentModal({ isOpen: true, is: "log" });
          }}
        >
          ☰ LOG
        </button>
        <button
          className="menuButton"
          style={{
            background: "var(--theme-accent-green)",
          }}
          onClick={() => {
            setCurrentModal({ isOpen: true, is: "menu" });
          }}
        >
          ☰ MENU
        </button>
      </div>
    </div>
  );
}
