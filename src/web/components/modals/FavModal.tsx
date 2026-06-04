import { useAppContext } from "../../context/AppContext";

export default function FavModal() {
  const { currentModal } = useAppContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "fav"
            ? "favModal open"
            : "favModal"
        }
      >
        <div className="modalWrap">
          <p>FAV MODAL</p>
        </div>
      </div>
    </>
  );
}
