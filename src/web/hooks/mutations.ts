import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Code, ElectronWindow } from "../types/types";

declare const window: ElectronWindow;

export const useCodeMutations = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => window.dbOp.deleteCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["langs"] });
      queryClient.invalidateQueries({ queryKey: ["codesLength"] });
    },
  });

  const addFavMutation = useMutation({
    mutationFn: (id: string) => window.dbOp.addFav(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
      queryClient.invalidateQueries({ queryKey: ["favCodes"] });
    },
  });

  const removeFavMutation = useMutation({
    mutationFn: (id: string) => window.dbOp.removeFav(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
      queryClient.invalidateQueries({ queryKey: ["favCodes"] });
    },
  });

  const upsertMutation = useMutation({
    mutationFn: (data: Code) => window.dbOp.upsertCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["langs"] });
      queryClient.invalidateQueries({ queryKey: ["codesLength"] });
    },
  });

  return { deleteMutation, upsertMutation, addFavMutation, removeFavMutation };
};
