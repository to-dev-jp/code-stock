// 画像URL
import logo from "../../assets/code-stock.png";

// フック
import { getTagColor } from "../hooks/utils";

// 定数
import { LANG_COLORS } from "../const/const";
import { FilterOption, Lang, Tag } from "../types/types";
import { useFilterContext } from "../context/provider/FilterProvider";
import { useAllCodesLength } from "../hooks/useCodes";
import { useModalsContext } from "../context/provider/ModalsProvider";
import { useLangs, useTags } from "../hooks/useLangsAndTags";

export default function SideBar() {
  const { data: langs } = useLangs();
  const { data: tags } = useTags();

  const { filterOption, setFilterOption } = useFilterContext();
  const { setCurrentModal } = useModalsContext();
  const { data: codeLength } = useAllCodesLength();

  return (
    <div className="sideNavScrollWrap">
      <div className="sideNavContainer">
        <nav className="sideNav">
          <div>
            <div className="sideNavTitleWrap">
              <img src={logo} width={34} height={34} />
              <h2 className="sideNavTitle">
                <span>Code</span> Stock
              </h2>
            </div>
            <div className="sideNavBox">
              <p className="sideNavHead">ALL</p>
              <ul className="sideNavList">
                <li
                  className={
                    filterOption.is === "all"
                      ? "sideNavItem selected"
                      : "sideNavItem"
                  }
                  onClick={() => {
                    setFilterOption((prev: FilterOption) => ({
                      ...prev,
                      is: "all",
                    }));
                  }}
                >
                  <div className="sideNavItemInner">
                    <span className="sideNavItemDot" />
                    <p>すべて</p>
                  </div>
                  <span>{codeLength}</span>
                </li>
              </ul>
            </div>
            <div className="sideNavPartation" />
            <div className="sideNavBox">
              <p className="sideNavHead">言語</p>
              <ul className="sideNavList">
                {langs?.map((lang: Lang, index: number) => {
                  return (
                    <li
                      className={
                        filterOption.lang === lang.lang &&
                        filterOption.is === "lang"
                          ? "sideNavItem selected"
                          : "sideNavItem"
                      }
                      key={"lang-" + index}
                      onClick={() => {
                        setFilterOption((prev: FilterOption) => ({
                          ...prev,
                          lang: lang.lang,
                          is: "lang",
                        }));
                      }}
                    >
                      <div className="sideNavItemInner">
                        <span
                          className="sideNavItemDot"
                          style={{
                            background: LANG_COLORS[
                              lang.lang as keyof typeof LANG_COLORS
                            ]
                              ? LANG_COLORS[
                                  lang.lang as keyof typeof LANG_COLORS
                                ].color
                              : "#3fe4a5",
                          }}
                        />
                        <p>{lang.lang}</p>
                      </div>
                      <span>{lang.count}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="sideNavPartation" />
            <div className="sideNavBox">
              <p className="sideNavHead">タグ</p>
              <ul className="sideNavList">
                {tags?.map((tag: Tag, index: number) => {
                  return (
                    <li
                      className={
                        filterOption.tag === tag.name &&
                        filterOption.is === "tag"
                          ? "sideNavItem selected"
                          : "sideNavItem"
                      }
                      key={"tag-" + index}
                      onClick={() => {
                        setFilterOption((prev: FilterOption) => ({
                          ...prev,
                          tag: tag.name,
                          is: "tag",
                        }));
                      }}
                    >
                      <div className="sideNavItemInner">
                        <span
                          className="sideNavItemDot"
                          style={{
                            background: getTagColor(tag.name),
                          }}
                        />
                        <p>{tag.name}</p>
                      </div>
                      <span>{tag.count}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="sideNavButtonPartation" />
          <button
            className="saveModalButton"
            onClick={() => setCurrentModal({ isOpen: true, is: "create" })}
          >
            <span className="imgBox">
              <span>☰</span>
            </span>
            <div className="saveTextWrap">
              <p className="saveText">+ 新しいコード</p>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
}
