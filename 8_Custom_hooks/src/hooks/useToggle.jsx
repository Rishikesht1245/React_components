import { useState } from "react";

export const useToggle = () => {
  const [state, setState] = useState(false);

  const handleToggle = () => {
    setState((prev) => !prev);
  };

  return { toggle: state, handleToggle };
};
