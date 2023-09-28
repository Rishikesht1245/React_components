import { useEffect, useState } from "react";
import { Movies } from "./Movies";
import { Search } from "./subcomponents/Search";
import axios from "axios";
import { Button } from "./subcomponents/Button";

const Home = () => {
  const VITE_API =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false";

  const [filteredResult, setFilteredResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    const response = await axios(`${VITE_API}`, {
      params: {
        query: searchInput || "movies",
      },
    });
    console.log(response.data.results);
    setFilteredResult(response.data.results);
  };

  // debouncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);
  return (
    <div className="flex flex-col justify-around items-center mx-auto gap-10">
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <Movies movies={filteredResult} />
      <Button
        type="button"
        text="View More"
        className={
          "w-[150px] p-2 mt-10 border border-1 border-white  hover:bg-red-600 hover:border-black"
        }
      />
    </div>
  );
};
export default Home;
