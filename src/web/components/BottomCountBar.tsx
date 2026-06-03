import { useAppContext } from "../context/AppContext";

export default function BottomCountBar() {
  const { langs, tagList } = useAppContext();
  return (
    <div
      className="bottomMenuBar"
      style={{
        bottom: "0",
        zIndex: "10",
        width: "100%",
        display: "flex",
        position: "absolute",
        boxSizing: "border-box",
        justifyContent: "right",
        height: "var(--bottom-menu-bar-height)",
        background: "var(--search-window-bg-color)",
        borderTop: "solid 2px var(--border-main-color)",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          padding: "0 22px",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          background: "var(--theme-sub-green)",
          borderLeft: "solid 2px var(--border-hover-color)",
        }}
      >
        <p className="countText">Language count: {langs ? langs.length : 0}</p>
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          padding: "0 22px",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          background: "var(--theme-accent-green)",
          borderLeft: "solid 2px var(--border-hover-color)",
        }}
      >
        <p className="countText">Tag count: {tagList ? tagList.length : 0}</p>
      </div>
    </div>
  );
}
