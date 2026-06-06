import { useEffect } from "react";

export default function ExportToast({
  isShow,
  setIsShow,
  success,
}: {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isShow]);

  return (
    <div className={isShow ? "toast show" : "toast"}>
      {success ? (
        <div>
          <p>エクスポートが完了しました</p>
        </div>
      ) : (
        <div>
          <p>エクスポートに失敗しました</p>
        </div>
      )}
    </div>
  );
}
