import { RiMovie2Line } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { Button } from "./subcomponents/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
  const [dark, setDark] = useState(true);
  const { auth, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({ type: "logout" });
  };
  return (
    <div className="flex z-[10] justify-between w-full p-3 sticky top-0 bg-black">
      <h1 className="flex gap-1 items-center text-red-600 font-semibold md:text-[30px] sm:text-[28px] text-[22px]">
        <RiMovie2Line />
        MovieApp
      </h1>
      <div className="flex gap-5 items-center sm:mr-10">
        <button
          className={`${
            dark ? "bg-white" : " bg-gray-900"
          } w-8 h-8 p-[6px] text-[18px] rounded-full shadow-sm`}
          onClick={() => setDark((prev) => !prev)}
        >
          {dark ? <MdDarkMode /> : <BsSun style={{ color: "white" }} />}
        </button>
        {auth ? (
          <Button
            handleClick={handleClick}
            type="button"
            text="Logout"
            className={
              "w-20 border border-1 border-white  hover:bg-black hover:border-black"
            }
          />
        ) : (
          <Button
            type="button"
            text="Sign Up"
            className={
              "w-20 border border-1 border-white  hover:bg-black hover:border-black"
            }
          />
        )}
      </div>
    </div>
  );
};
