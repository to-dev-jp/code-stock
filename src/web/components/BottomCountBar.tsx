import { useLangs, useTags } from "../hooks/useLangsAndTags";

export default function BottomCountBar() {
  const { data: langs } = useLangs();
  const { data: tags } = useTags();
  return (
    <div className="bottomMenuBar">
      <div className="bottomMenuBarWrap">
        <p className="countText">Language count: {langs ? langs.length : 0}</p>
      </div>
      <div className="bottomMenuBarWrap">
        <p className="countText">Tag count: {tags ? tags.length : 0}</p>
      </div>
    </div>
  );
}
