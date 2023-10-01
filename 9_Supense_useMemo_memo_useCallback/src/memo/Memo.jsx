import { useState } from "react";
import MemoChild from "./MemoChild";

export const Memo = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex flex-col bg-gray-700 text-white w-screen h-screen gap-10 items-center justify-center">
        <div className="flex flex-col gap-5">
          <h1>This Counter element : {count} </h1>
          <div className="flex gap-10">
            <button
              className="border border-1 border-white text-white font-bold p-3"
              onClick={() => setCount((prev) => prev - 1)}
            >
              Decrement
            </button>
            <button
              className="border border-1 border-white text-white font-bold p-3"
              onClick={() => setCount((prev) => prev + 1)}
            >
              Increment
            </button>
          </div>
        </div>
        <MemoChild count={count} />
      </div>
    </>
  );
};
