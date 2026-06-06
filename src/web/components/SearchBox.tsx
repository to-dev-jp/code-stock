import React, { useState } from "react";
import { useModalsContext } from "../context/provider/ModalsProvider";
import { useFilterContext } from "../context/provider/FilterProvider";
import { useQueryContext } from "../context/provider/QueryProvider";
import { FilterOption } from "../types/types";

export default function SearchBox({
  listStyle,
  setListStyle,
}: {
  listStyle: string;
  setListStyle: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setFilterOption } = useFilterContext();
  const { setCurrentModal } = useModalsContext();
  const { setQuery } = useQueryContext();

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
                setQuery(target.value);
                setFilterOption((prev: FilterOption) => {
                  return { ...prev, is: "search" };
                });
              }}
            />
          </div>
        </div>
        <button
          className="favModalButton"
          onClick={() => {
            setCurrentModal({ isOpen: true, is: "fav" });
          }}
        >
          ☰ FAV
        </button>
        <button
          className="logModalButton"
          onClick={() => {
            setCurrentModal({ isOpen: true, is: "log" });
          }}
        >
          ☰ LOG
        </button>
      </div>
    </div>
  );
}
