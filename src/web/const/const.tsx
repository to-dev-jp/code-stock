export const LANG_COLORS = {
  javascript: { bg: "rgba(110, 226, 127, 0.15)", color: "#6EE27F" },
  typescript: { bg: "rgba(61, 204, 168, 0.2)", color: "#3DCCA8" },
  python: { bg: "rgba(144, 217, 75, 0.18)", color: "#90D94B" },
  html: { bg: "rgba(184, 245, 184, 0.18)", color: "#B8F5B8" },
  css: { bg: "rgba(77, 217, 176, 0.18)", color: "#4DD9B0" },
  bash: { bg: "rgba(163, 230, 53, 0.18)", color: "#A3E635" },
  sql: { bg: "rgba(61, 204, 168, 0.15)", color: "#5DCAA5" },
  rust: { bg: "rgba(110, 226, 127, 0.18)", color: "#94E094" },
  go: { bg: "rgba(144, 217, 75, 0.15)", color: "#6EE27F" },
  java: { bg: "rgba(77, 217, 176, 0.15)", color: "#3DCCA8" },
};

export const TAG_COLORS = [
  "#73fa88", // ライトグリーン
  "#48e9c1", // ブライトティール
  "#a0f154", // イエローグリーン
  "#B8F5B8", // ペールグリーン
  "#57f5c5", // ミントグリーン
  "#aaf138", // ライムグリーン
];

// コードのフォームリセット用
export const blankData = {
  id: "",
  title: "",
  lang: "",
  code: "",
  note: "",
  created_at: "",
  tags: [""],
  isOpen: false,
};
