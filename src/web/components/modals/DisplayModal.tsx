// 画像URL
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
  return (
    <div
      className={displayData.isOpen ? "createModal open" : "createModal"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modalWrap" style={{ width: "90%", height: "90%" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span
            className="codeLang"
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
              display: "inline-block",
            }}
          >
            {displayData.lang}
          </span>
          <p>{displayData.title}</p>
        </div>
        <div style={{ display: "flex", gap: "3px", marginTop: "15px" }}>
          {displayData.tags.map((tag: string, i: number) => (
            <span key={"displayTag-" + i} className="codeTag">
              {tag}
            </span>
          ))}
        </div>
        <div
          style={{
            margin: "30px 0",
            borderRadius: "5px",
            paddingBottom: "10px",
            background: "rgb(40,58,40)",
          }}
        >
          <pre>
            <code className={`language-${displayData.lang} hljs`}>
              {displayData.code}
            </code>
          </pre>
        </div>
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          <span style={{ fontSize: "12px", opacity: 0.6 }}>コードの概要:</span>
          <br />
          {displayData.note}
        </p>
        <div
          style={{
            gap: "10px",
            display: "flex",
            justifyContent: "right",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() => {
              setDisplayData(blankData);
            }}
            className="cancelButton"
            style={{ cursor: "pointer" }}
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
            style={{
              color: "var(--theme-main-green)",
              fontSize: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
              padding: "4px 15px",
              boxSizing: "border-box",
              background: "rgb(60,90,60,0.3)",
              border: "solid 1px rgb(160,220,160,0.4)",
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
            style={{
              color: "var(--theme-main-green)",
              fontSize: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
              padding: "4px 15px",
              boxSizing: "border-box",
              background: "rgb(30,60,50,0.6)",
              border: "solid 1px rgb(120,180,150,0.6)",
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
