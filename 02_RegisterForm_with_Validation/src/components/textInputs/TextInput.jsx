import "./textInput.css";
const TextInput = ({
  name,
  text,
  type,
  placeholder,
  handleChange,
  error,
  handleBlur,
  formFields,
}) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        {text}
        <span className="danger">*</span> :
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formFields[name]}
      />
      {/* dynamic fetching of value from error object */}
      {error[name] && (
        <p className="danger">{`Please enter a valid ${text}`}</p>
      )}
    </div>
  );
};
export default TextInput;
