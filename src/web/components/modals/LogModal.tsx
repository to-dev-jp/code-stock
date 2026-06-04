import { useAppContext } from "../../context/AppContext";

export default function LogModal() {
  const { currentModal } = useAppContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "log"
            ? "logModal open"
            : "logModal"
        }
      >
        <div className="modalWrap">
          <p>LOG MODAL</p>
        </div>
      </div>
    </>
  );
}
