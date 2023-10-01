import { memo, useCallback, useMemo } from "react";

const MemoChild = ({ count }) => {
  const print = () => {
    console.log(count);
  };

  const counter = useMemo(() => print(), []);

  counter();
  return (
    <div className="flex flex-col ">
      <h1>This is the Memo Child </h1>
    </div>
  );
};

export default memo(MemoChild);
