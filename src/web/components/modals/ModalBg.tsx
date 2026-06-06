import { useModalsContext } from "../../context/provider/ModalsProvider";
import { DisplayData, Modal } from "../../types/types";

export default function ModalBg() {
  const { currentModal, setCurrentModal, displayData, setDisplayData } =
    useModalsContext();
  return (
    <div
      className={
        currentModal.isOpen || displayData.isOpen ? "ModalBg open" : "ModalBg"
      }
      onClick={() => {
        setCurrentModal((prev: Modal) => ({
          ...prev,
          isOpen: false,
        }));
        setDisplayData((prev: DisplayData) => ({
          ...prev,
          isOpen: false,
        }));
      }}
    />
  );
}
