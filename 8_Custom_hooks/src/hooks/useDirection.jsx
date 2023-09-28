import { useRef, useState } from "react";

export const useDirection = () => {
  const [state, setState] = useState("");
  const documentRef = useRef(document);
  const dir = documentRef.current.dir;

  const checkDirection = () => {
    dir === "rtl" ? setState("RTL") : setState("LTR");
  };

  return { direction: state, checkDirection };
};
