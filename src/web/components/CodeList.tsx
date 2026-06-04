import { useAppContext } from "../context/AppContext";
import { Code } from "../types/types";
import CodeCard from "./CodeCard";

export default function CodeList({ listStyle }: { listStyle: string }) {
  const { codes } = useAppContext();
  return (
    <div className="codeCardContainer">
      <div className="codeCardWrap">
        <div
          className={
            listStyle === "grid"
              ? "codeCardBox gridStyle"
              : "codeCardBox flexStyle"
          }
        >
          {codes?.map((code: Code) => {
            return <CodeCard code={code} key={code.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
