import { useAppContext } from "../../context/AppContext";

export default function LogModal() {
  const { currentModal, langs, tagList } = useAppContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "log"
            ? "logModal open"
            : "logModal"
        }
      >
        <div className="modalWrap">
          <p>統計情報</p>
          <div className="bottomMenuBarWrap">
            <p className="countText">
              Language count: {langs ? langs.length : 0}
            </p>
          </div>
          <div className="bottomMenuBarWrap">
            <p className="countText">
              Tag count: {tagList ? tagList.length : 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
