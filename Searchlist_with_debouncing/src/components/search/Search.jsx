import "./search.css";
import { IoSearch } from "react-icons/io5";
import SearchInput from "./searchInput/SearchInput";
import SearchList from "./searchList/SearchList";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const VITE_API =
    "https://api.themoviedb.org/3/search/movie?api_key=d3449ff6ec0c027623bf6b6f5fff78b3&language=en-US&page=1&include_adult=false";

  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    // // calling filter function on each input change
    // filterMovies(value);
  };

  // // ===== function to filter movies locally =======
  // const filterMovies = (value) => {
  //   if (value === "") {
  //     return setFilteredResult([]);
  //   }
  //   const filteredMovies = searchResult.filter((movie) =>
  //     movie.title.toLowerCase().includes(value.toLowerCase())
  //   );
  //   console.log(filteredMovies, "===movies filter");
  //   setFilteredResult(filteredMovies);
  // };

  // close button handler
  const handleClose = () => {
    setSearchInput("");
    setFilteredResult([]);
  };

  //data fetching from TMDB api
  const fetchMovies = async () => {
    const response = await axios(`${VITE_API}`, {
      params: {
        query: searchInput,
      },
    });
    console.log(response);
    setFilteredResult(response.data.results);
  };

  // implementing debouncing calling api inside setTimeout
  useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchMovies();
    }, 300);

    // debouncing will be cleared on each re-render
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchInput]);

  return (
    <div className="search-container">
      <div className="search-heading">
        <IoSearch className="icon" style={{ fontSize: "32px" }} />
        <h1>Search movies here ?</h1>
      </div>
      <SearchInput
        searchInput={searchInput}
        handleChange={handleChange}
        handleClose={handleClose}
      />
      <SearchList filteredResult={filteredResult} />
    </div>
  );
};
export default Search;
