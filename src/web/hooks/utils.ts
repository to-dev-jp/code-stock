import { TAG_COLORS } from "../const/const";

export const getTagColor = (tag: string) => {
  let hash = 0;
  for (let c of tag) hash = (hash * 20 + c.charCodeAt(0)) & 0xffff;
  return TAG_COLORS[hash % TAG_COLORS.length];
};
