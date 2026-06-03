import { useAppContext } from "../../context/AppContext";
import { Modal } from "../../types/types";

export default function EditModal() {
  const {
    handleEdit,
    handleEditData,
    editData,
    editTagInput,
    setEditTagInput,
    handleEditTagKeyDown,
    editTags,
    removeEditTag,
    currentModal,
    setCurrentModal,
  } = useAppContext();

  return (
    <div
      className={
        currentModal.isOpen && currentModal.is === "edit"
          ? "createModal open"
          : "createModal"
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modalWrap" style={{ width: "90%", height: "91.5%" }}>
        <h3>コードを編集</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
            setCurrentModal({ isOpen: false, is: "edit" });
          }}
          style={{
            display: "grid",
            gridGap: "10px",
            marginTop: "15px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div>
            <label>
              <p className="formLabel">タイトル</p>
              <input
                name="title"
                placeholder="タイトルを入力する"
                defaultValue={editData.title}
                onChange={(e) => {
                  handleEditData(e);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              <p className="formLabel">言語</p>
              <input
                name="lang"
                placeholder="言語を入力する"
                defaultValue={editData.lang}
                onChange={(e) => {
                  handleEditData(e);
                }}
              />
            </label>
          </div>
          <div style={{ gridColumn: "1/3" }}>
            <label>
              <p className="formLabel">タグ(Enterで追加)</p>
              <input
                value={editTagInput}
                onChange={(e) => setEditTagInput(e.target.value)}
                onKeyDown={handleEditTagKeyDown}
                placeholder="タグを入力してEnter"
              />
              {editTags.map((tag: string, i: number) => (
                <span key={"editTag-" + i} className="codeTag">
                  {tag}
                  <button type="button" onClick={() => removeEditTag(i)}>
                    ×
                  </button>
                </span>
              ))}
            </label>
          </div>
          <div style={{ gridColumn: "1/3" }}>
            <label>
              <p className="formLabel">コード本文</p>
              <textarea
                name="code"
                placeholder="コードを入力する"
                defaultValue={editData.code}
                onChange={(e) => {
                  handleEditData(e);
                }}
              />
            </label>
          </div>
          <div style={{ gridColumn: "1/3" }}>
            <label>
              <p className="formLabel">メモ</p>
              <input
                name="note"
                placeholder="説明文を入力する"
                defaultValue={editData.note}
                onChange={(e) => {
                  handleEditData(e);
                }}
              />
            </label>
          </div>
          <div
            style={{
              gap: "10px",
              gridColumn: "1/3",
              display: "flex",
              marginTop: "10px",
              justifyContent: "right",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setCurrentModal((prev: Modal) => ({
                  ...prev,
                  isOpen: false,
                }));
              }}
              className="cancelButton"
              style={{
                cursor: "pointer",
              }}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="saveButton"
              style={{
                cursor: "pointer",
              }}
            >
              保存する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
