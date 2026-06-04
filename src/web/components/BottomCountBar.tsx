import { useAppContext } from "../context/AppContext";

export default function BottomCountBar() {
  const { langs, tagList } = useAppContext();
  return (
    <div className="bottomMenuBar">
      <div className="bottomMenuBarWrap">
        <p className="countText">Language count: {langs ? langs.length : 0}</p>
      </div>
      <div className="bottomMenuBarWrap">
        <p className="countText">Tag count: {tagList ? tagList.length : 0}</p>
      </div>
    </div>
  );
}
