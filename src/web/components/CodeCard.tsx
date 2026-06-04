// 画像URL
import edit from "../../assets/edit-green.png";
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
      style={{
        height: "260px",
        display: "grid",
        cursor: "pointer",
        gridTemplateRows: "0.55fr 0.45fr",
      }}
      onClick={() => {
        setDisplayData({
          ...code,
          note: code.note ?? "",
          isOpen: true,
        });
      }}
    >
      <div
        className="codeArea"
        style={{
          height: "100%",
          display: "flex",
          overflow: "hidden",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "96%",
            marginTop: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
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
            style={{
              right: "0",
              zIndex: "10",
              bottom: "16px",
              fontSize: "9px",
              borderRadius: "8px",
              position: "absolute",
              padding: "3.5px 15px",
              boxSizing: "border-box",
              background: "rgb(50,62,50)",
            }}
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
      <div
        className="codeInfoArea"
        style={{
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          justifyContent: "center",
          borderTop: "solid 1px var(--border-main-color)",
        }}
      >
        <div style={{ height: "74%", width: "90%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
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
          <div
            style={{
              marginTop: "8px",
            }}
          >
            <div
              style={{
                gap: "4px",
                display: "inline-flex",
              }}
            >
              {code.tags.map((tag, i) => {
                return (
                  <span className="codeTag" key={"tag-" + i}>
                    {tag}
                  </span>
                );
              })}
            </div>
            <div
              style={{
                gap: "8px",
                display: "flex",
                marginTop: "6px",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
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
                style={{
                  color: "var(--theme-main-green)",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "3px",
                  border: "none",
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
                style={{
                  color: "var(--theme-main-green)",
                  fontSize: "10px",
                  cursor: "pointer",
                  borderRadius: "3px",
                  border: "none",
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
