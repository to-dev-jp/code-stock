import { useState } from "react";

export const useQueries = () => {
  const [query, setQuery] = useState<string>("");

  return { query, setQuery };
};
