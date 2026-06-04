import "../../styles/modal.css";
import { useAppContext } from "../../context/AppContext";

export default function MenuModal() {
  const { currentModal } = useAppContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "log"
            ? "menuModal open"
            : "menuModal"
        }
      >
        <div className="modalWrap">
          <p>LOG MODAL</p>
        </div>
      </div>
      <div
        className={
          currentModal.isOpen && currentModal.is === "menu"
            ? "menuModal open"
            : "menuModal"
        }
      >
        <div className="modalWrap">
          <p>MENU MODAL</p>
        </div>
      </div>
    </>
  );
}
