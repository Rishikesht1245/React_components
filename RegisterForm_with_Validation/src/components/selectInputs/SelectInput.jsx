import "./selectInput.css";
const SelectInput = ({
  name,
  text,
  options,
  handleChange,
  error,
  handleBlur,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {text}
        <span className="danger">*</span> :
      </label>

      <select onChange={handleChange} onBlur={handleBlur}>
        <option className="options">-- Select Your Country --</option>
        {options.map((option, index) => {
          return (
            <option
              className="options"
              key={index}
              type={"checkbox"}
              name={name}
              id={option}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
      {error[name] && (
        <p className="danger">{`Please select a valid ${name}`}</p>
      )}
    </div>
  );
};
export default SelectInput;
