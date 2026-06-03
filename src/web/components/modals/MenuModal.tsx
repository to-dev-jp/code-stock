import { useAppContext } from "../../context/AppContext";

export default function MenuModal() {
  const { currentModal } = useAppContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "log"
            ? "createModal open"
            : "createModal"
        }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modalWrap" style={{ width: "90%", height: "90%" }}>
          <p>LOG MODAL</p>
        </div>
      </div>
      <div
        className={
          currentModal.isOpen && currentModal.is === "menu"
            ? "createModal open"
            : "createModal"
        }
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modalWrap" style={{ width: "90%", height: "90%" }}>
          <p>MENU MODAL</p>
        </div>
      </div>
    </>
  );
}
