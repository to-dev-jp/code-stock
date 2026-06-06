import { Modal, ToastError } from "../../types/types";
import { useModalsContext } from "../../context/provider/ModalsProvider";
import { useSaveContext } from "../../context/provider/SaveProvider";
import { useCodeMutations } from "../../hooks/mutations";
import { useState } from "react";
import { validationCheck } from "../../hooks/utils";
import Toast from "../toasts/Toast";

export default function SaveModal() {
  const {
    codeData,
    handleCodeData,
    tagInput,
    setTagInput,
    newTags,
    handleTagKeyDown,
    removeTag,
    refreshSubmitData,
  } = useSaveContext();

  const { currentModal, setCurrentModal } = useModalsContext();
  const { upsertMutation } = useCodeMutations();

  const [errors, setErrors] = useState<ToastError>({});

  return (
    <>
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
              const pending = tagInput.trim();
              const finalTags = pending ? [...newTags, pending] : newTags;
              const finalCodeData = { ...codeData, tags: finalTags };
              const isOk = validationCheck(finalTags, finalCodeData, setErrors);
              if (!isOk) return;
              upsertMutation.mutate(finalCodeData, {
                onSuccess: () => refreshSubmitData(),
              });
              setCurrentModal({ isOpen: false, is: "create" });
            }}
            style={{
              display: "grid",
              gridGap: "10px",
              marginTop: "15px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Toast errors={errors} setErrors={setErrors} />
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
