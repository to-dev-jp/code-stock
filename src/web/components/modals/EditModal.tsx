import { Modal, ToastError } from "../../types/types";
import { useEditContext } from "../../context/provider/EditProvider";
import { useModalsContext } from "../../context/provider/ModalsProvider";
import { useCodeMutations } from "../../hooks/mutations";
import Toast from "../toasts/Toast";
import { validationCheck } from "../../hooks/utils";
import { useState } from "react";

export default function EditModal() {
  const {
    handleEditData,
    editData,
    editTagInput,
    setEditTagInput,
    handleEditTagKeyDown,
    editTags,
    removeEditTag,
    refreshEditData,
  } = useEditContext();

  const { currentModal, setCurrentModal } = useModalsContext();
  const { upsertMutation } = useCodeMutations();

  const [errors, setErrors] = useState<ToastError>({});

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
            const pending = editTagInput.trim();
            const finalTags = pending ? [...editTags, pending] : editTags;
            const finalCodeData = { ...editData, tags: finalTags };
            const isOk = validationCheck(finalTags, finalCodeData, setErrors);
            if (!isOk) return;
            upsertMutation.mutate(
              { ...editData, tags: finalTags },
              { onSuccess: () => refreshEditData() },
            );
            setCurrentModal({ isOpen: false, is: "edit" });
          }}
          className="editForm"
        >
          <Toast errors={errors} setErrors={setErrors} />
          <div>
            <label>
              <p className="formLabel">タイトル</p>
              <input
                name="title"
                placeholder="タイトルを入力する"
                value={editData.title}
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
                value={editData.lang}
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
                value={editData.code}
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
                value={editData.note}
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
