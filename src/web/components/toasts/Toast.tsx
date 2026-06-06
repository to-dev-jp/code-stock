import { useEffect } from "react";
import { ToastError } from "../../types/types";

export default function Toast({
  errors,
  setErrors,
}: {
  errors: ToastError;
  setErrors: React.Dispatch<React.SetStateAction<ToastError>>;
}) {
  const validationError =
    errors.title || errors.lang || errors.tags || errors.code;
  useEffect(() => {
    if (!errors.shownAt) return;
    const timer = setTimeout(() => {
      setErrors({});
    }, 2000);

    return () => clearTimeout(timer);
  }, [errors.title, errors.lang, errors.tags, errors.code, errors.shownAt]);

  return (
    <div className={validationError ? "toast show" : "toast"}>
      <div>
        {errors.title && <p>{errors.title}</p>}
        {errors.lang && <p>{errors.lang}</p>}
        {errors.tags && <p>{errors.tags}</p>}
        {errors.code && <p>{errors.code}</p>}
      </div>
    </div>
  );
}
