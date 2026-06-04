const { contextBridge, ipcRenderer } = require("electron");
import { Code, CodeInput } from "./web/types/types";

contextBridge.exposeInMainWorld("dbOp", {
  createDb: async () => ipcRenderer.invoke("createDb"), //データベース作成
  getCodesByLang: async (lang: string) =>
    ipcRenderer.invoke("getCodesByLang", lang), //言語別にコードを取得
  getCodesByTag: async (tag: string) =>
    ipcRenderer.invoke("getCodesByTag", tag), //タグ別にコードを取得
  getLangs: async () => ipcRenderer.invoke("getLangs"), //言語を取得
  getTags: async () => ipcRenderer.invoke("getTags"), //タグ一覧を取得
  upsertCode: async (data: Code) => ipcRenderer.invoke("upsertCode", data), //コードを作成・編集
  searchCodes: async (query: string) =>
    ipcRenderer.invoke("searchCodes", query), //コードを検索
  deleteCode: async (id: string) => ipcRenderer.invoke("deleteCode", id), //コードを削除
  closeWindow: () => ipcRenderer.invoke("closeWindow"),
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
  maximizeWindow: () => ipcRenderer.invoke("maximizeWindow"),
  unmaximizeWindow: () => ipcRenderer.invoke("unmaximizeWindow"),
  isMaximized: () => ipcRenderer.invoke("isMaximized"),
});
