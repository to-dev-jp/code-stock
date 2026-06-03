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
    <div
      className="sideNavScrollWrap"
      style={{
        height: "calc(100vh - var(--title-bar-height))",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div className="sideNavContainer">
        <nav
          className="sideNav"
          style={{
            width: "85%",
            padding: "var(--side-nav-vertical-gap) 0",
            display: "grid",
            gridGap: "22px",
            gridTemplateRows: "auto 1px var(--create-button-height)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img src={logo} width={34} height={34} />
              <h2 className="sideNavTitle">
                <span>Code</span> Stock
              </h2>
            </div>
            <div className="sideNavBox">
              <p className="sideNavHead">言語</p>
              <ul className="sideNavList">
                <li
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "11px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--theme-main-green)",
                      }}
                    />
                    <p>すべて</p>
                  </div>
                  <span>{codeCount}</span>
                </li>
              </ul>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                marginTop: "20px",
                background: "var(--border-main-color)",
              }}
            />
            <div className="sideNavBox">
              <p className="sideNavHead">言語</p>
              <ul className="sideNavList">
                {langs?.map((lang: Lang, index: number) => {
                  return (
                    <li
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "11px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
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
            <div
              style={{
                width: "100%",
                height: "1px",
                marginTop: "20px",
                background: "var(--border-main-color)",
              }}
            />
            <div className="sideNavBox">
              <p className="sideNavHead">タグ</p>
              <ul className="sideNavList">
                {tagList?.map((tag: Tag, index: number) => {
                  return (
                    <li
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "11px",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
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
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "var(--border-main-color)",
            }}
          />
          <button
            className="createModalButton"
            style={{
              display: "flex",
              fontSize: "12px",
              cursor: "pointer",
              overflow: "hidden",
              borderRadius: "3px",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--border-main-color)",
              border: "solid 1px var(--border-main-color)",
            }}
            onClick={() => setCurrentModal({ isOpen: true, is: "create" })}
          >
            <span className="imgBox">
              <span>☰</span>
            </span>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                justifyContent: "right",
              }}
            >
              <p className="createText">+ 新しいコード</p>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
}
