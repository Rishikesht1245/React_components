import { useState, useTransition } from "react";

export const Transition = () => {
  const [count, setCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const onIncrement = () => {
    setCount((prev) => prev + 1);
    startTransition(() => {
      const newUserList = Array.from({ length: 5000 }).map((_, index) => ({
        id: index,
        name: "Some Name",
      }));

      setUserList(newUserList);
    });
  };

  return (
    <div className="bg-gray-800 text-white font-bold w-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="">Counter : {count}</h1>
      <button
        className="border border-1 border-white p-2"
        onClick={onIncrement}
      >
        Increment
      </button>

      <div>
        <h1>User List</h1>
        {userList.map((item, index) => {
          return <h4>{item.name}</h4>;
        })}
      </div>
    </div>
  );
};
