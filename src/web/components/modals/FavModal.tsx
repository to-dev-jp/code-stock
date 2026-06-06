import { useModalsContext } from "../../context/provider/ModalsProvider";
import { useFavCodes } from "../../hooks/useCodes";
import { Code } from "../../types/types";
import CodeCard from "../CodeCard";

export default function FavModal() {
  const { data: favCodes } = useFavCodes();
  const { currentModal } = useModalsContext();
  return (
    <>
      <div
        className={
          currentModal.isOpen && currentModal.is === "fav"
            ? "favModal open"
            : "favModal"
        }
      >
        <div className="modalWrap fav">
          <p className="favModalTitle">お気に入りコード一覧</p>
          <div className="favModalListWrap">
            <ul className="favModalList">
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
      </div>
    </>
  );
}
