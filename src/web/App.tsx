// highlight.js
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import go from "highlight.js/lib/languages/go";
// import html from "highlight.js/lib/languages/html";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";

import "./App.css";
import { useEffect, useState } from "react";
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";
import CodeList from "./components/CodeList";
import SaveModal from "./components/modals/SaveModal";
import DisplayModal from "./components/modals/DisplayModal";
import EditModal from "./components/modals/EditModal";
import BottomCountBar from "./components/BottomCountBar";
import SearchBox from "./components/SearchBox";
import MenuModal from "./components/modals/MenuModal";
import { useAppContext } from "./context/AppContext";

// highlight.jsの言語登録
hljs.registerLanguage("go", go);
// hljs.registerLanguage("html", html);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);

export const App = () => {
  const {
    codes,
    searchCodes,
    setFilterOption,
    setCodeCount,
    getLang,
    getTag,
    getIsMaximized,
  } = useAppContext();

  const [isInitial, setIsInitial] = useState(true); //起動時の処理用
  const [listStyle, setListStyle] = useState("grid"); //コード一覧の表示形式

  useEffect(() => {
    getLang();
    getTag();
    searchCodes("");
    getIsMaximized();
  }, []);

  useEffect(() => {
    // コードのシンタックスハイライト処理
    if (!codes) return;
    // 起動時のフィルターの処理
    if (!isInitial) return;
    setCodeCount(codes.length);
    setFilterOption({
      lang: "",
      tag: "",
      is: "all",
      count: codes.length,
    });
    setIsInitial(false);
  }, [codes]);

  return (
    <>
      <div>
        <TitleBar />
        <div
          className="mainContainer"
          style={{
            width: "100%",
            height: "calc(100vh - var(--title-bar-height))",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "225px auto",
            }}
          >
            <SideBar />
            <SaveModal />
            <DisplayModal />
            <EditModal />
            <MenuModal />
            <div
              className="mainScrollWrap"
              style={{ width: "100%", height: "100%", overflow: "auto" }}
            >
              <div
                className="MainWrap"
                style={{
                  display: "grid",
                  minWidth: "600px",
                  position: "relative",
                  gridTemplateRows: "100px auto",
                  height: "calc(100vh - var(--title-bar-height))",
                }}
              >
                <BottomCountBar />
                <SearchBox listStyle={listStyle} setListStyle={setListStyle} />
                <div
                  className="codeCardScrollWrap"
                  style={{ height: "100%", overflow: "auto" }}
                >
                  <CodeList listStyle={listStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
