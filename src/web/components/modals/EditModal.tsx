import "../../styles/modal.css";
import { Modal } from "../../types/types";
import { useAppContext } from "../../context/AppContext";

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
          ? "editModal open"
          : "editModal"
      }
    >
      <div className="modalWrap">
        <h3>コードを編集</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit();
            setCurrentModal({ isOpen: false, is: "edit" });
          }}
          className="editForm"
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
          <div className="wideColumn">
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
          <div className="wideColumn">
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
          <div className="wideColumn">
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
          <div className="editButtonsWrap">
            <button
              type="button"
              onClick={() => {
                setCurrentModal((prev: Modal) => ({
                  ...prev,
                  isOpen: false,
                }));
              }}
              className="cancelButton"
            >
              キャンセル
            </button>
            <button type="submit" className="saveButton">
              保存する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
