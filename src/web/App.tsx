// highlight.js
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import go from "highlight.js/lib/languages/go";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import dart from "highlight.js/lib/languages/dart";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import kotlin from "highlight.js/lib/languages/kotlin";
import java from "highlight.js/lib/languages/java";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import rust from "highlight.js/lib/languages/rust";

import "./App.css";
import "./styles/modal.css";
import "./styles/toast.css";

import { useEffect, useState } from "react";
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";
import CodeList from "./components/CodeList";
import SaveModal from "./components/modals/SaveModal";
import DisplayModal from "./components/modals/DisplayModal";
import EditModal from "./components/modals/EditModal";
import BottomCountBar from "./components/BottomCountBar";
import SearchBox from "./components/SearchBox";
import LogModal from "./components/modals/LogModal";
import FavModal from "./components/modals/FavModal";
import { useWindowStateContext } from "./context/provider/WindowStateProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalBg from "./components/modals/ModalBg";

// highlight.jsの言語登録
hljs.registerLanguage("go", go);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("python", python);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("php", php);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("java", java);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("rust", rust);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false, // フォーカス時の再取得も切る
    },
  },
});

export const App = () => {
  const { getIsMaximized } = useWindowStateContext();

  const [listStyle, setListStyle] = useState("grid"); //コード一覧の表示形式

  useEffect(() => {
    getIsMaximized();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>
          <TitleBar />
          <div className="mainContainer">
            <div className="mainContent">
              <SideBar />
              <ModalBg />
              <FavModal />
              <LogModal />
              <DisplayModal />
              <SaveModal />
              <EditModal />
              <div className="mainScrollWrap">
                <div className="mainWrap">
                  <BottomCountBar />
                  <SearchBox
                    listStyle={listStyle}
                    setListStyle={setListStyle}
                  />
                  <div className="codeCardScrollWrap">
                    <CodeList listStyle={listStyle} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};
