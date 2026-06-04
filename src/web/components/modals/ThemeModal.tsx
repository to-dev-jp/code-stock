import { applyTheme } from "../../theme/theme";

export default function ThemeModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className={isOpen ? "themeModal open" : "themeModal"}>
        <div>
          <button
            onClick={() => {
              applyTheme("atom-one-dark");
            }}
          >
            ATOM
          </button>
          <button
            onClick={() => {
              applyTheme("github-dark");
            }}
          >
            GITHUB
          </button>
          <button
            onClick={() => {
              applyTheme("monokai");
            }}
          >
            MONOKAI
          </button>
        </div>
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          CLOSE
        </button>
      </div>
    </>
  );
}
