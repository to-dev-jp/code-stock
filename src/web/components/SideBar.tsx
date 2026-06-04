// 画像URL
import logo from "../../assets/code-stock.png";

// フック
import { getTagColor } from "../hooks/utils";

// 定数
import { LANG_COLORS } from "../const/const";
import { useAppContext } from "../context/AppContext";
import { Filter, Lang, Tag } from "../types/types";

export default function SideBar() {
  const {
    getCodeByLang,
    getCodeByTag,
    searchCodes,
    filterOption,
    setFilterOption,
    codeCount,
    setCurrentModal,
    langs,
    tagList,
  } = useAppContext();

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
                    setFilterOption((prev: Filter) => ({
                      ...prev,
                      is: "all",
                      count: codeCount,
                    }));
                    searchCodes("");
                  }}
                >
                  <div className="sideNavItemInner">
                    <span className="sideNavItemDot" />
                    <p>すべて</p>
                  </div>
                  <span>{codeCount}</span>
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
                        setFilterOption((prev: Filter) => ({
                          ...prev,
                          lang: lang.lang,
                          is: "lang",
                          count: lang.count,
                        }));
                        getCodeByLang(lang.lang);
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
                {tagList?.map((tag: Tag, index: number) => {
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
                        setFilterOption((prev: Filter) => ({
                          ...prev,
                          tag: tag.name,
                          is: "tag",
                          count: tag.count,
                        }));
                        getCodeByTag(tag.name);
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
