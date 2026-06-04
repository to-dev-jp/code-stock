import { useAppContext } from "../../context/AppContext";
import { Code } from "../../types/types";
import CodeCard from "../CodeCard";

export default function FavModal() {
  const { currentModal, favCodes } = useAppContext();
  console.log(favCodes);
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
          <p>お気に入りコード一覧</p>
          <ul>
            {favCodes &&
              favCodes.map((code: Code) => {
                return (
                  <li key={code.id}>
                    <CodeCard code={code} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
