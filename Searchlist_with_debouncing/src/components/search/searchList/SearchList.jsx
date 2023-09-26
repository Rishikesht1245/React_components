import "./searchList.css";
const SearchList = ({ filteredResult }) => {
  return (
    <div className="search-list-container">
      {filteredResult.map((item, index) => {
        return (
          <div className="search-list-item" key={item.id}>
            <img
              width={50}
              height={50}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="movies"
            />
            <p className="title">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};
export default SearchList;
