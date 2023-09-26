import "./searchInput.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SearchInput = ({ searchInput, handleChange, handleClose }) => {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Search here..."
        value={searchInput}
        onChange={handleChange}
      />
      {searchInput && (
        <button className="close-btn" onClick={handleClose}>
          <AiOutlineCloseCircle className="close-icon" />
        </button>
      )}
    </div>
  );
};
export default SearchInput;
