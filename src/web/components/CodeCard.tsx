// 画像URL
import edit from "../../assets/edit-green.png";
import fav from "../../assets/fav-green.png";
import unfav from "../../assets/edit-green.png";
import trash from "../../assets/delete-green.png";

import { Code } from "../types/types";
import hljs from "highlight.js/lib/core";
import { LANG_COLORS } from "../const/const";
import { useAppContext } from "../context/AppContext";
import { useEffect, useRef } from "react";

export default function CodeCard({ code }: { code: Code }) {
  const {
    setEditData,
    setEditTags,
    handleDelete,
    setCurrentModal,
    setDisplayData,
    addFav,
    removeFav,
    refleshFavCodes,
  } = useAppContext();

  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (el && !el.dataset.highlighted) {
      hljs.highlightElement(el);
    }
  }, [code.code, code.lang]);

  return (
    <div
      className="codeCard"
      onClick={() => {
        setDisplayData({
          ...code,
          note: code.note ?? "",
          isOpen: true,
        });
      }}
    >
      <div className="codeArea">
        <div className="codeWrap">
          <div className="codeMain">
            <pre>
              <code
                ref={codeRef}
                className={`language-${code.lang}`}
                style={{ width: "500px" }}
              >
                {code.code}
              </code>
            </pre>
          </div>
          <button
            className="copyButton"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(code.code);
            }}
            title="コードをコピーする"
          >
            COPY
          </button>
        </div>
      </div>
      <div className="codeInfoArea">
        <div className="codeInfoWrap">
          <div className="codeLangArea">
            <p
              className="codeLang"
              style={{
                color: LANG_COLORS[code.lang as keyof typeof LANG_COLORS]
                  ? LANG_COLORS[code.lang as keyof typeof LANG_COLORS].color
                  : "#3fe4a5",
                background: LANG_COLORS[code.lang as keyof typeof LANG_COLORS]
                  ? LANG_COLORS[code.lang as keyof typeof LANG_COLORS].bg
                  : "#2e6b54",

                border: `solid 1px ${
                  LANG_COLORS[code.lang as keyof typeof LANG_COLORS]
                    ? LANG_COLORS[code.lang as keyof typeof LANG_COLORS].color
                    : "#3fe4a5"
                }`,
              }}
            >
              {code.lang}
            </p>
            <p className="codeTitle">{code.title}</p>
          </div>
          <div>
            <div className="codeTagArea">
              {code.tags.map((tag, i) => {
                return (
                  <span className="codeTag" key={"tag-" + i}>
                    {tag}
                  </span>
                );
              })}
            </div>
            <div className="codeButtonsWrap">
              {code.is_favorite === 1 ? (
                <button
                  className="editButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFav(code.id);
                    refleshFavCodes();
                  }}
                >
                  <img
                    src={unfav}
                    width={20}
                    height={20}
                    title="お気に入りから削除する"
                  />
                </button>
              ) : (
                <button
                  className="editButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    addFav(code.id);
                    refleshFavCodes();
                  }}
                >
                  <img
                    src={fav}
                    width={20}
                    height={20}
                    title="お気に入りに追加する"
                  />
                </button>
              )}
              <button
                className="editButton"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentModal({
                    isOpen: true,
                    is: "edit",
                  });
                  setEditData({
                    ...code,
                    note: code.note ?? "",
                  });
                  setEditTags(code.tags);
                }}
              >
                <img src={edit} width={20} height={20} title="コードの編集" />
              </button>
              <button
                type="button"
                className="deleteButton"
                onClick={(e) => {
                  e.stopPropagation();
                  const confirm =
                    window.confirm("本当に削除してもよろしいですか?");
                  if (confirm) handleDelete(code.id);
                }}
              >
                <img src={trash} width={18} height={18} title="コードの削除" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
