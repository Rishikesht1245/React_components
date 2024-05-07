import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./input";
import { IoCloseCircleOutline } from "react-icons/io5";

export const Search = ({ searchInput, setSearchInput }) => {
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleClick = () => {
    setSearchInput("");
  };

  return (
    <>
      <div className="w-[300px] sm:w-[500px] flex relative">
        <Input
          type="text"
          placeholder="Search movies here..."
          name="input"
          value={searchInput}
          handleChange={handleChange}
        />
        {searchInput && (
          <Button
            handleClick={handleClick}
            type="button"
            text={<IoCloseCircleOutline />}
            className={
              "absolute right-2 top-2 text-gray-900 text-[18px] hover:text-black"
            }
          />
        )}
      </div>
    </>
  );
};
