import { applyTheme } from "../../theme/theme";

export default function HelpModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className={isOpen ? "helpModal open" : "helpModal"}>
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
