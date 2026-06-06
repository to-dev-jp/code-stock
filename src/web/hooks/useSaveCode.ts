import { ElectronWindow } from "../types/types";

import { useState } from "react";
declare const window: ElectronWindow;

export const useSaveCode = () => {
  const initialCodeData = {
    id: "",
    title: "",
    lang: "",
    code: "",
    note: "",
    created_at: "",
    tags: [""],
    is_favorite: 0,
  };

  const [codeData, setCodeData] = useState(initialCodeData);

  // 保存用のコードデータをセット
  const handleCodeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = e;
    setCodeData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const refreshSubmitData = () => {
    setCodeData(initialCodeData);
    setNewTags([]);
    setTagInput("");
  };

  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 保存用のタグをセット
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Enterを押すと、リストに追加
      e.preventDefault();
      if (tagInput.trim()) {
        setNewTags([...newTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  // タグの削除(保存用)
  const removeTag = (index: number) => {
    setNewTags(newTags.filter((_, i) => i !== index));
  };

  return {
    codeData,
    handleCodeData,
    tagInput,
    setTagInput,
    newTags,
    handleTagKeyDown,
    removeTag,
    refreshSubmitData,
  };
};
