import { useQuery } from "@tanstack/react-query";
import { ElectronWindow, Tag } from "../types/types";

declare const window: ElectronWindow;

export const useLangs = () => {
  return useQuery({
    queryKey: ["langs"], // 条件が変わればキーが変わり自動で再取得
    queryFn: async () => {
      const result = await window.dbOp.getLangs();
      if (!result.success) throw new Error("取得に失敗しました");
      return result.data; // ここで返したものが data になる
    },
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: ["tags"], // 条件が変わればキーが変わり自動で再取得
    queryFn: async () => {
      const result = await window.dbOp.getTags();
      if (!result.success) throw new Error("取得に失敗しました");
      return result.data as Array<Tag>; // ここで返したものが data になる
    },
  });
};
