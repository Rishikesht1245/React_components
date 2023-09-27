import { useContext } from "react";
import Buttons from "./Buttons";
import { CounterContext } from "../context/CounterContext";

const Counter = () => {
  const { state } = useContext(CounterContext);
  return (
    <div className="py-5 flex flex-col gap-5 items-center">
      <h1 className="text-center font-semibold text-[32px]">Counter 🕰️</h1>
      <span className="border-2 text-[32px] text-gray-600 font-bold border-red-500 border-dashed p-2 px-5">
        {state.count}
      </span>
      <Buttons />
    </div>
  );
};
export default Counter;
