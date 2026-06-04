import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import { BrowserWindow, app, ipcMain } from "electron";
import {
  closeDb,
  createDb,
  deleteCode,
  getCodesByLang,
  getCodesByTag,
  getLangs,
  getTags,
  initDb,
  searchCodes,
  upsertCode,
} from "./web/db/codes";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 520,
    title: "Code Stock",
    titleBarStyle: "hidden",
    webPreferences: {
      // webpack が出力したプリロードスクリプトを読み込み
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });
  ipcMain.handle("closeWindow", () => mainWindow.close());
  ipcMain.handle("minimizeWindow", () => mainWindow.minimize());
  ipcMain.handle("maximizeWindow", () => mainWindow.maximize());
  ipcMain.handle("unmaximizeWindow", () => mainWindow.unmaximize());
  ipcMain.handle("isMaximized", () => mainWindow.isMaximized());

  // レンダラープロセスをロード
  mainWindow.loadFile("dist/index.html");
  mainWindow.setMenuBarVisibility(false);
};

app.whenReady().then(() => {
  initDb();
  createDb();

  ipcMain.handle("createDb", (_e, _args) => {
    try {
      createDb();
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("getCodesByLang", (_e, lang) => {
    try {
      const data = getCodesByLang(lang);
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("getCodesByTag", (_e, tag) => {
    try {
      const data = getCodesByTag(tag);
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("searchCodes", (_e, query) => {
    try {
      const data = searchCodes(query);
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("upsertCode", (_e, data) => {
    try {
      const item = {
        ...data,
        id: data.id ?? uuidv4(), // idがなければ新規生成
      };
      upsertCode(item);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("getLangs", (_e, _args) => {
    try {
      const data = getLangs();
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("deleteCode", (_e, id) => {
    try {
      deleteCode(id);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  ipcMain.handle("getTags", (_e, _args) => {
    try {
      const data = getTags();
      return { success: true, data };
    } catch (e) {
      return {
        success: false,
        error: e instanceof Error ? e.message : "不明なエラーが発生しました",
      };
    }
  });

  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.on("will-quit", closeDb);
app.on("window-all-closed", () => app.quit());
