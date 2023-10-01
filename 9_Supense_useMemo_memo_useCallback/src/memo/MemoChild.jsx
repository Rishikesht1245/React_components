import { memo, useCallback, useMemo } from "react";

const MemoChild = ({ count }) => {
  const print = () => {
    console.log(count);
    return count + 1;
  };

  const counter = useMemo(() => print(), []);

  return (
    <div className="flex flex-col ">
      <h1>This is the Memo Child </h1>
      <h1>Counter : {counter}</h1>
    </div>
  );
};

export default memo(MemoChild);
