import logo from "../../../assets/code-stock.png";
import atom from "../../../assets/atom-theme.png";
import github from "../../../assets/github-theme.png";
import monokai from "../../../assets/monokai-theme.png";
import { applyTheme } from "../../theme/theme";

export default function SettingsModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className={isOpen ? "settingsModal open" : "settingsModal"}>
        <div className="settingsModalContainer">
          <p className="settingsModalTitle">ハイライトテーマ変更</p>
          <div className="settingsModalCardWrap">
            <div className="settingsModalCard">
              <div className="settingsThemeImgBox">
                <img
                  className="settingsThemeImg"
                  src={atom}
                  width="530"
                  height="340"
                  alt="ATOMテーマカラーイメージ画像"
                />
              </div>
              <button
                className="settingsThemeButton atom"
                onClick={() => {
                  applyTheme("atom-one-dark");
                }}
              >
                ATOM
              </button>
            </div>
            <div className="settingsModalCard">
              <div className="settingsThemeImgBox">
                <img
                  className="settingsThemeImg"
                  src={github}
                  width="530"
                  height="340"
                  alt="GITHUBテーマカラーイメージ画像"
                />
              </div>
              <button
                className="settingsThemeButton github"
                onClick={() => {
                  applyTheme("github-dark");
                }}
              >
                GITHUB
              </button>
            </div>
            <div className="settingsModalCard">
              <div className="settingsThemeImgBox">
                <img
                  className="settingsThemeImg"
                  src={monokai}
                  width="530"
                  height="340"
                  alt="MONOKAIテーマカラーイメージ画像"
                />
              </div>
              <button
                className="settingsThemeButton monokai"
                onClick={() => {
                  applyTheme("monokai");
                }}
              >
                MONOKAI
              </button>
            </div>
          </div>
        </div>
        <button
          className="settingsModalCancelButton"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          キャンセル
        </button>
      </div>
    </>
  );
}
