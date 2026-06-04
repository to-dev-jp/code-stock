import path from "node:path";
import { app } from "electron";
import Database from "better-sqlite3";
import { Code, CodeInput, CodeRows } from "../types/types";

let db: Database.Database;

export const initDb = () => {
  db = new Database(path.join(app.getPath("userData"), "my_database.db"));
};

export const createDb = () => {
  const cx = db.transaction(() => {
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
  cx();
};

export const upsertCode = (item: Code) => {
  // コード本体を保存
  const tx = db.transaction((it: Code) => {
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
    ).run(it.id, it.title, it.lang, it.code, it.note, it.created_at);

    // 編集時に古いタグを削除してから入れ直す
    db.prepare(`DELETE FROM code_tags WHERE code_id = ?`).run(item.id);

    // タグを保存（なければ追加）
    for (const tagName of it.tags) {
      db.prepare(`INSERT OR IGNORE INTO tags (name) VALUES (?)`).run(tagName);
      const tag = db
        .prepare(`SELECT id FROM tags WHERE name = ?`)
        .get(tagName) as { id: number } | undefined;
      if (!tag) continue;
      db.prepare(`INSERT INTO code_tags (code_id, tag_id) VALUES (?, ?)`).run(
        it.id,
        tag.id,
      );
    }
  });
  tx(item);
};

// 取得時はタグをまとめて返す
export const getCodesByLang = (lang?: string) => {
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
    .all(lang ?? null, lang ?? null) as Array<CodeRows>;

  return rows.map((r) => ({
    ...r,
    tags: r.tags ? r.tags.split(",") : [],
  }));
};

export const getCodesByTag = (tag?: string) => {
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
    .all(tag) as Array<CodeRows>;

  return rows.map((r) => ({
    ...r,
    tags: r.tags ? r.tags.split(",") : [],
  }));
};

export const searchCodes = (query: string) => {
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
    .all(`%${query}%`, `%${query}%`) as Array<CodeRows>;

  return rows.map((r) => ({
    ...r,
    tags: r.tags ? r.tags.split(",") : [],
  }));
};

export const getLangs = () => {
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

export const getTags = () => {
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

export const deleteCode = (id: string) => {
  db.prepare(
    `
    DELETE
    FROM codes
    WHERE id = ?;
  `,
  ).run(id);
};

export const closeDb = () => db.close();
