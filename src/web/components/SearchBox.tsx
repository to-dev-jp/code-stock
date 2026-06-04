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
      <div className="searchBox">
        <div className="styleChangeContainer">
          <div className="styleChangeBox">
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
            />
          </div>
        </div>
        <button
          className="searchRunButton"
          onClick={() => {
            setCurrentModal({ isOpen: true, is: "log" });
          }}
        >
          ☰ LOG
        </button>
        <button
          className="menuButton"
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
