export interface DbResponse {
  success: boolean;
  error?: string;
  data?: Code[];
}

export interface LangResponse {
  success: boolean;
  error?: string;
  data: Lang[];
}

export interface TagResponse {
  success: boolean;
  error?: string;
  data: Tag[];
}

export type Lang = {
  lang: string;
  count: number;
};

export type Tag = {
  name: string;
  count: number;
};

export type Code = {
  id: string;
  title: string;
  lang: string;
  code: string;
  note: string | null;
  created_at: string;
  tags: string[];
  is_favorite: number;
};

export type CodeRows = {
  id: string;
  title: string;
  lang: string;
  code: string;
  note: string | null;
  created_at: string;
  tags: string;
  is_favorite: number;
};

export type DisplayData = {
  id: string;
  title: string;
  lang: string;
  code: string;
  note: string;
  created_at: string;
  tags: Array<string>;
  isOpen: boolean;
  is_favorite: number;
};

export type Modal = {
  is: string;
  isOpen: boolean;
};

export type Filter = {
  lang: string;
  tag: string;
  is: string;
  count: number;
};

export type CodeInput = Omit<Code, "id">;

export interface ElectronWindow extends Window {
  dbOp: {
    createDb: () => Promise<DbResponse>;
    getCodesByLang: (lang: string) => Promise<DbResponse>;
    getCodesByTag: (tag: string) => Promise<DbResponse>;
    searchCodes: (query: string) => Promise<DbResponse>;
    getLangs: () => Promise<LangResponse>;
    upsertCode: (data: Code) => Promise<DbResponse>;
    getTags: () => Promise<TagResponse>;
    deleteCode: (id: string) => Promise<DbResponse>;
    closeWindow: () => void;
    minimizeWindow: () => void;
    maximizeWindow: () => void;
    unmaximizeWindow: () => void;
    isMaximized: () => Promise<boolean>;
    exportCodes: () => Promise<{ success: boolean; error?: string }>;
    addFav: (id: string) => Promise<DbResponse>;
    removeFav: (id: string) => Promise<DbResponse>;
    getFavCodes: () => Promise<DbResponse>;
  };
}
