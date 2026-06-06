import { useCopyContext } from "../context/provider/CopyStateProvider";
import { useFilterContext } from "../context/provider/FilterProvider";
import { useQueryContext } from "../context/provider/QueryProvider";
import { useCodes } from "../hooks/useCodes";
import { Code } from "../types/types";
import CodeCard from "./CodeCard";
import CopyToast from "./toasts/CopyToast";

export default function CodeList({ listStyle }: { listStyle: string }) {
  const { filterOption } = useFilterContext();
  const { query } = useQueryContext();
  const { isCopied, setIsCopied } = useCopyContext();
  const { data: codes } = useCodes(filterOption, query);

  return (
    <div className="codeCardContainer">
      <CopyToast isShow={isCopied} setIsShow={setIsCopied} />
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
