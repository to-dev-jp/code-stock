import atomOneDark from "../../themes/atom-one-dark-reasonable.css?url";
import githubDark from "../../themes/github-dark.css?url";
import monokai from "../../themes/monokai.css?url";

const THEMES = {
  "atom-one-dark": atomOneDark,
  "github-dark": githubDark,
  monokai: monokai,
} as const;

export type ThemeName = keyof typeof THEMES;

export const applyTheme = (theme: ThemeName) => {
  let link = document.getElementById("hljs-theme") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = "hljs-theme";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = THEMES[theme];
};
