import { useModalsContext } from "../../context/provider/ModalsProvider";
import { useLangs, useTags } from "../../hooks/useLangsAndTags";

export default function LogModal() {
  const { currentModal } = useModalsContext();
  const { data: langs } = useLangs();
  const { data: tags } = useTags();
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
            <p className="countText">Tag count: {tags ? tags.length : 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}
