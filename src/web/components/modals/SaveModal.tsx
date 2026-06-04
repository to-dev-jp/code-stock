import "../../styles/modal.css";
import { useAppContext } from "../../context/AppContext";
import { DisplayData, Modal } from "../../types/types";

export default function SaveModal() {
  const {
    handleSubmit,
    codeData,
    handleCodeData,
    tagInput,
    setTagInput,
    newTags,
    handleTagKeyDown,
    removeTag,
    currentModal,
    setCurrentModal,
    displayData,
    setDisplayData,
  } = useAppContext();

  return (
    <>
      <div
        className={
          currentModal.isOpen || displayData.isOpen ? "ModalBg open" : "ModalBg"
        }
        onClick={() => {
          setCurrentModal((prev: Modal) => ({
            ...prev,
            isOpen: false,
          }));
          setDisplayData((prev: DisplayData) => ({
            ...prev,
            isOpen: false,
          }));
        }}
      />
      <div
        className={
          currentModal.isOpen && currentModal.is === "create"
            ? "saveModal open"
            : "saveModal"
        }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modalWrap" style={{ width: "90%", height: "90%" }}>
          <h3>新しいコードを作成</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
              setCurrentModal({ isOpen: false, is: "create" });
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
                  value={codeData.title}
                  onChange={(e) => {
                    handleCodeData(e);
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
                  value={codeData.lang}
                  onChange={(e) => {
                    handleCodeData(e);
                  }}
                />
              </label>
            </div>
            <div style={{ gridColumn: "1/3" }}>
              <label>
                <p className="formLabel">タグ(Enterで追加)</p>
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="タグを入力してEnter"
                />
                {newTags.map((tag: string, i: number) => (
                  <span key={i} className="codeTag">
                    {tag}
                    <button type="button" onClick={() => removeTag(i)}>
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
                  value={codeData.code}
                  onChange={(e) => {
                    handleCodeData(e);
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
                  value={codeData.note}
                  onChange={(e) => {
                    handleCodeData(e);
                  }}
                />
              </label>
            </div>
            <div
              style={{
                gridColumn: "1/3",
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                justifyContent: "right",
              }}
            >
              <button
                type="button"
                style={{
                  cursor: "pointer",
                }}
                className="cancelButton"
                onClick={() => {
                  setCurrentModal((prev: Modal) => ({
                    ...prev,
                    isOpen: false,
                  }));
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
    </>
  );
}
