import { FilterOption } from "../types/types";

import { useState } from "react";

export const useFilter = () => {
  const [filterOption, setFilterOption] = useState<FilterOption>({
    lang: "",
    tag: "",
    is: "all",
  });

  return { filterOption, setFilterOption };
};
