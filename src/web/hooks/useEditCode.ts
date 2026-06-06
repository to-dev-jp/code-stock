import { Code, ElectronWindow } from "../types/types";

import { useState } from "react";
declare const window: ElectronWindow;

export const useEditCode = () => {
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

  const [editData, setEditData] = useState(initialCodeData);

  const refreshEditData = () => {
    setEditData(initialCodeData);
    setEditTags([]);
    setEditTagInput("");
  };

  // 編集用のコードデータをセット
  const handleEditData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = e;
    setEditData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const [editTags, setEditTags] = useState<string[]>([]);
  const [editTagInput, setEditTagInput] = useState("");

  // 編集用のタグをセット
  const handleEditTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // ← これを追加
      if (editTagInput.trim()) {
        setEditTags([...editTags, editTagInput.trim()]);
        setEditTagInput("");
      }
    }
  };

  // タグの削除(編集用)
  const removeEditTag = (index: number) => {
    setEditTags(editTags.filter((_, i) => i !== index));
  };

  return {
    setEditData,
    setEditTags,
    handleEditData,
    editData,
    editTagInput,
    setEditTagInput,
    handleEditTagKeyDown,
    editTags,
    removeEditTag,
    refreshEditData,
  };
};
