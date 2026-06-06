import { useEffect } from "react";

export default function CopyToast({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isShow]);

  return (
    <div className={isShow ? "toast show" : "toast"}>
      <p>コピーしました</p>
    </div>
  );
}
