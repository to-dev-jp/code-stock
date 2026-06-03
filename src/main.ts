import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

let db: Database.Database;

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
  db = new Database(path.join(app.getPath("userData"), "my_database.db"));

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

  const createDb = db.transaction(() => {
    db.prepare(
      `CREATE TABLE IF NOT EXISTS codes (
          id          TEXT PRIMARY KEY,
          title       TEXT NOT NULL,
          lang        TEXT NOT NULL,  
          code        TEXT NOT NULL,
          note        TEXT,
          created_at  TEXT NOT NULL
          );`,
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS tags (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL UNIQUE
);`,
    ).run();

    db.prepare(
      `CREATE TABLE IF NOT EXISTS code_tags (
  code_id TEXT NOT NULL REFERENCES codes(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (code_id, tag_id)
);`,
    ).run();

    db.prepare(
      `CREATE INDEX IF NOT EXISTS idx_codes_lang    ON codes(lang);`,
    ).run();

    db.prepare(
      `CREATE INDEX IF NOT EXISTS idx_code_tags_tag ON code_tags(tag_id);`,
    ).run();
  });

  const upsertCode = db.transaction((item) => {
    // コード本体を保存
    db.prepare(
      `
    INSERT INTO codes (id, title, lang, code, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT (id) DO UPDATE SET
      title = excluded.title,
      lang = excluded.lang,
      code = excluded.code,
      note = excluded.note
  `,
    ).run(
      item.id,
      item.title,
      item.lang,
      item.code,
      item.note,
      item.created_at,
    );

    // 編集時に古いタグを削除してから入れ直す
    db.prepare(`DELETE FROM code_tags WHERE code_id = ?`).run(item.id);

    // タグを保存（なければ追加）
    for (const tagName of item.tags) {
      db.prepare(`INSERT OR IGNORE INTO tags (name) VALUES (?)`).run(tagName);
      const tag = db
        .prepare(`SELECT id FROM tags WHERE name = ?`)
        .get(tagName) as { id: number } | undefined;
      if (!tag) return;
      db.prepare(`INSERT INTO code_tags (code_id, tag_id) VALUES (?, ?)`).run(
        item.id,
        tag.id,
      );
    }
  });

  // 取得時はタグをまとめて返す
  const getCodesByLang = (lang?: string) => {
    const rows = db
      .prepare(
        `
    SELECT c.*,
      GROUP_CONCAT(t.name) AS tags
    FROM codes c
    LEFT JOIN code_tags ct ON c.id = ct.code_id
    LEFT JOIN tags t       ON ct.tag_id = t.id
    WHERE (? IS NULL OR c.lang = ?)
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `,
      )
      .all(lang ?? null, lang ?? null) as Array<{ tags: string }>;

    return rows.map((r) => ({
      ...r,
      tags: r.tags ? r.tags.split(",") : [],
    }));
  };

  const getCodesByTag = (tag?: string) => {
    const rows = db
      .prepare(
        `
    SELECT c.*,
      GROUP_CONCAT(t.name) AS tags
    FROM codes c
    JOIN code_tags ct ON c.id = ct.code_id
    JOIN tags t       ON ct.tag_id = t.id
    WHERE t.name = ?
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `,
      )
      .all(tag) as Array<{ tags: string }>;

    return rows.map((r) => ({
      ...r,
      tags: r.tags ? r.tags.split(",") : [],
    }));
  };

  const searchCodes = (query: string) => {
    const rows = db
      .prepare(
        `
    SELECT c.*,
      GROUP_CONCAT(t.name) AS tags
    FROM codes c
    LEFT JOIN code_tags ct ON c.id = ct.code_id
    LEFT JOIN tags t       ON ct.tag_id = t.id
    WHERE (c.title LIKE ? OR c.code LIKE ?)
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `,
      )
      .all(`%${query}%`, `%${query}%`) as Array<{ tags: string }>;

    return rows.map((r) => ({
      ...r,
      tags: r.tags ? r.tags.split(",") : [],
    }));
  };

  const getLangs = () => {
    const rows = db
      .prepare(
        `
    SELECT lang, COUNT(*) as count
    FROM codes
    GROUP BY lang
    ORDER BY lang ASC
  `,
      )
      .all() as { lang: string; count: number }[];

    return rows; // { lang, count }の配列をそのまま返す
  };

  const getTags = () => {
    const rows = db
      .prepare(
        `
    SELECT t.name, COUNT(*) as count
    FROM tags t
    INNER JOIN code_tags ct ON t.id = ct.tag_id
    GROUP BY t.id
    ORDER BY t.name ASC
  `,
      )
      .all() as { name: string; count: number }[];

    return rows; // { name, count }の配列をそのまま返す
  };

  const deleteCode = (id: string) => {
    db.prepare(
      `
    DELETE
    FROM codes
    WHERE id = ?;
  `,
    ).run(id);
  };

  createWindow();
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once("window-all-closed", () => app.quit());
