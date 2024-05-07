import { useContext } from "react";
import DecrementButton from "./subcomponents/DecrementButton";
import IncrementButton from "./subcomponents/IncrementButton";
import { CounterContext } from "../context/CounterContext";

const Buttons = () => {
  const { dispatch } = useContext(CounterContext);
  const handleIncrement = () => {
    dispatch({ type: "increment" });
  };
  const handleIncrementBy5 = () => {
    dispatch({ type: "incrementBy5", payload: 5 });
  };
  const handleDecrement = () => {
    dispatch({ type: "decrement" });
  };
  const handleDecrementBy5 = () => {
    dispatch({ type: "decrementBy5", payload: 5 });
  };
  return (
    <div className="flex gap-10 mt-5">
      <div className="flex flex-col gap-5">
        <DecrementButton handleDecrement={handleDecrement} text={"Decrement"} />
        <DecrementButton
          handleDecrement={handleDecrementBy5}
          text={"Decrement By 5"}
        />
      </div>
      <div className="flex flex-col gap-5">
        <IncrementButton handleIncrement={handleIncrement} text={"Increment"} />
        <IncrementButton
          handleIncrement={handleIncrementBy5}
          text={"Increment By 5"}
        />
      </div>
    </div>
  );
};
export default Buttons;
