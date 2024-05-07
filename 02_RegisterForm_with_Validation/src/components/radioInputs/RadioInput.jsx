import "./radioInput.css";
const RadioInput = ({ name, text, type, handleChange, inputs, error }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {text}
        <span className="danger">*</span> :
      </label>

      <div className="radio-groups">
        {inputs.map((input, index) => {
          return (
            <div className="radio-input" key={index}>
              <input
                type={type}
                name={name}
                id={input}
                value={input}
                onChange={handleChange}
              />
              <label htmlFor={input}>{input}</label>
            </div>
          );
        })}
      </div>
      {error[name] && (
        <p className="danger">{`Please enter a valid ${text}`}</p>
      )}
    </div>
  );
};
export default RadioInput;
