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
    const timer = setTimeout(() => {
      setErrors({});
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [errors.title, errors.lang, errors.tags, errors.code]);

  return (
    <div className={validationError ? "toast show" : "toast"}>
      {errors.title && <p>{errors.title}</p>}
      {errors.lang && <p>{errors.lang}</p>}
      {errors.tags && <p>{errors.tags}</p>}
      {errors.code && <p>{errors.code}</p>}
    </div>
  );
}
