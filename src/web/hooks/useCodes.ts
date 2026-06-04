// 型宣言
import { Code, Tag, Lang, DbResponse, ElectronWindow } from "../types/types";

import { useState } from "react";
declare const window: ElectronWindow;

// hooks/useCodes.ts
export const useCodes = () => {
  const [codes, setCodes] = useState<Code[] | undefined>();
  const [favCodes, setFavCodes] = useState<Code[] | undefined>();
  const [filterOption, setFilterOption] = useState({
    lang: "",
    tag: "",
    is: "lang",
    count: 0,
  });

  const [codeCount, setCodeCount] = useState<number>(0);

  const getCodeByLang = async (lang = "a") => {
    const result = await window.dbOp.getCodesByLang(lang);
    if (result.success) setCodes(result.data);
  };

  const getCodeByTag = async (tag = "a") => {
    const result = await window.dbOp.getCodesByTag(tag);
    if (result.success) setCodes(result.data);
  };

  const searchCodes = async (query = "") => {
    const result = await window.dbOp.searchCodes(query);
    if (result.success) setCodes(result.data);
  };

  const getFavCodes = async () => {
    const result = await window.dbOp.getFavCodes();
    if (result.success) setFavCodes(result.data);
  };

  // 保存・編集時のコード一覧のリフレッシュ
  const refleshCodes = async () => {
    let updated: DbResponse;
    if (filterOption.is === "all") {
      updated = await window.dbOp.searchCodes("");
    } else if (filterOption.is === "lang") {
      updated = await window.dbOp.getCodesByLang(filterOption.lang);
    } else {
      updated = await window.dbOp.getCodesByTag(filterOption.tag);
    }
    if (updated.success) {
      setCodes(updated.data);
      setCodeCount(updated.data ? updated.data.length : 0);
    }
  };

  const refleshFavCodes = async () => {
    const updated = await window.dbOp.getFavCodes();
    console.log(updated);
    if (updated.success) {
      setFavCodes(updated.data);
    }
  };

  return {
    codes,
    favCodes,
    getCodeByLang,
    getCodeByTag,
    searchCodes,
    getFavCodes,
    refleshCodes,
    refleshFavCodes,
    filterOption,
    setFilterOption,
    codeCount,
    setCodeCount,
  };
};

export const useLangsAndTags = () => {
  const [langs, setLangs] = useState<Lang[] | undefined>();
  const [tagList, setTagList] = useState<Tag[] | undefined>();

  const getLang = async () => {
    const langs = await window.dbOp.getLangs();
    if (langs.success) {
      console.log("言語を取得しました");
      setLangs(langs.data);
    } else {
      console.log(langs.error);
      return;
    }
  };

  const getTag = async () => {
    const tags = await window.dbOp.getTags();
    if (tags.success) {
      console.log("タグ一覧を取得しました");
      setTagList(tags.data);
    } else {
      console.log(tags.error);
      return;
    }
  };

  // 保存・編集時のタグと言語一覧のリフレッシュ
  const refleshLangsAndTags = async () => {
    const updatedLangs = await window.dbOp.getLangs();
    if (updatedLangs.success) setLangs(updatedLangs.data);
    const updatedTags = await window.dbOp.getTags();
    if (updatedTags.success) setTagList(updatedTags.data);
  };

  return { langs, tagList, getLang, getTag, refleshLangsAndTags };
};

export const useHandleData = ({
  refleshCodes,
  refleshLangsAndTags,
}: {
  refleshCodes: () => Promise<void>;
  refleshLangsAndTags: () => Promise<void>;
}) => {
  const initialCodeData = {
    title: "",
    lang: "",
    code: "",
    note: "",
    created_at: "",
    tags: [""],
  };

  const [codeData, setCodeData] = useState(initialCodeData);
  const [editData, setEditData] = useState(initialCodeData);

  const handleSubmit = async () => {
    const currentDate = new Date();

    const submitData = {
      ...codeData,
      created_at: currentDate.toString(),
      tags: newTags,
    } as Code;

    const result = await window.dbOp.upsertCode(submitData);
    if (result.success) {
      console.log("コードを保存しました");
      refleshCodes();
      refleshLangsAndTags();
      refleshSubmitData();
    } else {
      console.log("作成に失敗しました:" + result.error);
    }
  };

  const refleshSubmitData = () => {
    setCodeData(initialCodeData);
    setNewTags([]);
    setTagInput("");
  };

  const refleshEditData = () => {
    setEditData(initialCodeData);
    setEditTags([]);
    setEditTagInput("");
  };

  const handleEdit = async () => {
    const submitData = {
      ...editData,
      tags: editTags,
    } as Code;

    const result = await window.dbOp.upsertCode(submitData);
    if (result.success) {
      console.log("コードを保存しました");
      refleshCodes();
      refleshLangsAndTags();
      refleshEditData();
    } else {
      console.log("作成に失敗しました:" + result.error);
    }
  };

  // 保存用のコードデータをセット
  const handleCodeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { target } = e;
    setCodeData((prev) => ({ ...prev, [target.name]: target.value }));
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

  // コードの削除
  const handleDelete = async (id: string) => {
    const result = await window.dbOp.deleteCode(id);

    if (result.success) {
      console.log("コードが削除されました");
      refleshLangsAndTags();
      refleshCodes();
    } else {
      console.log(result.error);
    }
  };

  const addFav = async (id: string) => {
    const result = await window.dbOp.addFav(id);
    if (result.success) {
      console.log("お気に入りに追加しました");
      refleshCodes();
    } else {
      console.log("お気に入り追加に失敗しました:" + result.error);
    }
  };

  const removeFav = async (id: string) => {
    const result = await window.dbOp.removeFav(id);
    if (result.success) {
      console.log("お気に入りから削除しました");
      refleshCodes();
    } else {
      console.log("お気に入り削除に失敗しました:" + result.error);
    }
  };

  return {
    handleSubmit,
    codeData,
    handleCodeData,
    tagInput,
    setTagInput,
    handleEdit,
    newTags,
    handleTagKeyDown,
    removeTag,
    setEditData,
    setEditTags,
    handleDelete,
    handleEditData,
    editData,
    editTagInput,
    setEditTagInput,
    handleEditTagKeyDown,
    editTags,
    removeEditTag,
    addFav,
    removeFav,
  };
};
