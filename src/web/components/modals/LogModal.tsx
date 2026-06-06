import { useModalsContext } from "../../context/provider/ModalsProvider";
import { useLangs, useTags } from "../../hooks/useLangsAndTags";
import { Lang, Tag } from "../../types/types";

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
          <p className="logModalTitle">統計情報</p>
          <div className="logModalWrap">
            <div className="logModalBox">
              <p className="logModalHead">
                言語総数: {langs ? langs.length : 0}
              </p>
              <div className="logLangList">
                {langs && langs.length > 0 && (
                  <ul className="logLangList">
                    {langs?.map((lang: Lang) => {
                      return <li key={lang.lang}>{lang.lang}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
            <div className="logModalBox">
              <p className="logModalHead">タグ総数: {tags ? tags.length : 0}</p>
              <div className="logTagList">
                {tags && tags.length > 0 && (
                  <ul className="logTagList">
                    {tags?.map((tag: Tag) => {
                      return <li key={tag.name}>{tag.name}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
