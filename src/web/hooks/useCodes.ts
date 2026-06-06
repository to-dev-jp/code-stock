import { useQuery } from "@tanstack/react-query";
import { DbResponse, ElectronWindow, FilterOption } from "../types/types";

declare const window: ElectronWindow;

export const useCodes = (filterOption: FilterOption, query?: string) => {
  return useQuery({
    queryKey: [
      "codes",
      filterOption.is,
      filterOption.lang,
      filterOption.tag,
      query,
    ], // 条件が変わればキーが変わり自動で再取得
    queryFn: async () => {
      let result: DbResponse;
      if (filterOption.is === "all") {
        result = await window.dbOp.searchCodes("");
      } else if (filterOption.is === "lang") {
        result = await window.dbOp.getCodesByLang(filterOption.lang || "");
      } else if (filterOption.is === "tag") {
        result = await window.dbOp.getCodesByTag(filterOption.tag || "");
      } else if (filterOption.is === "search") {
        result = await window.dbOp.searchCodes(query ?? "");
      } else {
        result = await window.dbOp.searchCodes("");
      }
      if (!result.success) throw new Error("取得に失敗しました");
      return result.data; // ここで返したものが data になる
    },
  });
};

export const useFavCodes = () => {
  return useQuery({
    queryKey: ["favCodes"], // 条件が変わればキーが変わり自動で再取得
    queryFn: async () => {
      const result = await window.dbOp.getFavCodes();
      if (!result.success) throw new Error("取得に失敗しました");
      return result.data; // ここで返したものが data になる
    },
  });
};

export const useAllCodesLength = () => {
  return useQuery({
    queryKey: ["codesLength"], // 条件が変わればキーが変わり自動で再取得
    queryFn: async () => {
      const result = await window.dbOp.searchCodes("");
      if (!result.success) throw new Error("取得に失敗しました");
      return result.data?.length ?? 0; // ここで返したものが data になる
    },
  });
};
