// 画像URL
import "../../styles/modal.css";
import hljs from "highlight.js/lib/core";
import { useEffect, useRef } from "react";
import edit from "../../../assets/edit-green.png";
import trash from "../../../assets/delete-green.png";
import { blankData, LANG_COLORS } from "../../const/const";
import { useAppContext } from "../../context/AppContext";

export default function DisplayModal() {
  const {
    setEditData,
    setEditTags,
    handleDelete,
    displayData,
    setDisplayData,
    setCurrentModal,
  } = useAppContext();

  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    delete el.dataset.highlighted; // 処理済みフラグを消す
    hljs.highlightElement(el); // 改めてハイライト
  }, [displayData.code, displayData.lang]);

  return (
    <div className={displayData.isOpen ? "displayModal open" : "displayModal"}>
      <div className="modalWrap">
        <div className="modalBox">
          <span
            className="modalCodeLang"
            style={{
              color: LANG_COLORS[displayData.lang as keyof typeof LANG_COLORS]
                ? LANG_COLORS[displayData.lang as keyof typeof LANG_COLORS]
                    .color
                : "#3fe4a5",
              background: LANG_COLORS[
                displayData.lang as keyof typeof LANG_COLORS
              ]
                ? LANG_COLORS[displayData.lang as keyof typeof LANG_COLORS].bg
                : "#1b6146",
              border: `solid 1px ${
                LANG_COLORS[displayData.lang as keyof typeof LANG_COLORS]
                  ? LANG_COLORS[displayData.lang as keyof typeof LANG_COLORS]
                      .color
                  : "#3fe4a5"
              }`,
            }}
          >
            {displayData.lang}
          </span>
          <p>{displayData.title}</p>
        </div>
        <div className="modalTagList">
          {displayData.tags.map((tag: string, i: number) => (
            <span key={"displayTag-" + i} className="codeTag">
              {tag}
            </span>
          ))}
        </div>
        <div className="modalCodeBox">
          <pre>
            <code ref={codeRef} className={`language-${displayData.lang}`}>
              {displayData.code}
            </code>
          </pre>
        </div>
        <p className="modalCodeDesc">
          <span className="modalCodeDescLabel">コードの概要:</span>
          <br />
          {displayData.note}
        </p>
        <div className="displayButtonsWrap">
          <button
            onClick={() => {
              setDisplayData(blankData);
            }}
            className="cancelButton"
          >
            キャンセル
          </button>
          <button
            className="editButton"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentModal({
                isOpen: true,
                is: "edit",
              });
              setEditData({
                ...displayData,
                note: displayData.note ?? "",
              });
              setEditTags(displayData.tags);
            }}
          >
            <p>編集する</p>
            <img src={edit} width={20} height={20} title="コードの編集" />
          </button>
          <button
            type="button"
            className="deleteButton"
            onClick={(e) => {
              e.stopPropagation();
              const confirm = window.confirm("本当に削除してもよろしいですか?");
              if (confirm) handleDelete(displayData.id);
            }}
          >
            <p>削除する</p>
            <img src={trash} width={18} height={18} title="コードの削除" />
          </button>
        </div>
      </div>
    </div>
  );
}
