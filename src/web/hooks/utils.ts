import React from "react";
import { TAG_COLORS } from "../const/const";
import { Code, ToastError } from "../types/types";

export const getTagColor = (tag: string) => {
  let hash = 0;
  for (let c of tag) hash = (hash * 20 + c.charCodeAt(0)) & 0xffff;
  return TAG_COLORS[hash % TAG_COLORS.length];
};

export const validationCheck = (
  finalTags: string[],
  codeData: Code,
  setErrors: React.Dispatch<React.SetStateAction<ToastError>>,
) => {
  const newErrors: ToastError = {};

  if (finalTags.length === 0) newErrors.tags = "タグを1つ以上入力してください";
  if (!codeData.title.trim()) newErrors.title = "タイトルを入力してください";
  if (!codeData.lang.trim()) newErrors.lang = "使用言語を入力してください";
  if (!codeData.code.trim()) newErrors.code = "コード本文を入力してください";
  if (Object.values(newErrors).length > 0) {
    setErrors({ ...newErrors, shownAt: Date.now() });
    return false;
  }
  return true;
};
