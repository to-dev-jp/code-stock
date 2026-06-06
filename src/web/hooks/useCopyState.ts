import { useState } from "react";

export const useCopyState = () => {
  const [isCopied, setIsCopied] = useState(false);

  return { isCopied, setIsCopied };
};
