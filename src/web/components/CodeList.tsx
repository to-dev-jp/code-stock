import { useAppContext } from "../context/AppContext";
import { Code } from "../types/types";
import CodeCard from "./CodeCard";

export default function CodeList({ listStyle }: { listStyle: string }) {
  const { codes } = useAppContext();
  return (
    <div className="codeCardContainer">
      <div
        className="codeCardWrap"
        style={{
          padding:
            "var(--search-vertical-gap) 0 calc(var(--search-vertical-gap) + 25px)",
          width: "calc(100% - 2*var(--search-side-gap))",
        }}
      >
        <div
          className={
            listStyle === "grid"
              ? "codeCardBox gridStyle"
              : "codeCardBox flexStyle"
          }
          style={{
            display: "grid",
            gridGap: "20px",
          }}
        >
          {codes?.map((code: Code) => {
            return <CodeCard code={code} key={code.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
