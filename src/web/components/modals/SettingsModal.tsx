import logo from "../../../assets/code-stock.png";
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
                  src={logo}
                  width="100"
                  height="160"
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
                  src={logo}
                  width="100"
                  height="160"
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
                  src={logo}
                  width="100"
                  height="160"
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
