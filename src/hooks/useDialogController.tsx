import { useState } from "react";

export const useDialogController = (initialState: boolean) => {
  const [visible, setVisible] = useState(initialState);

  const handleDialogVisibility = (visibility: boolean) => setVisible(visibility);

  return { visible, handleDialogVisibility };
};
