import { Form } from "../Form";

export const Input = ({
  type,
  placeholder,
  value,
  error,
  handleChange,
  name,
}) => {
  return (
    <div className="w-full">
      <input
        className="p-2 w-full bg-gray-300 text-gray-900 border-0 outline-none focus:border-2 focus:border-red-400 rounded-[5px]"
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
      />
      {error && (
        <p className="text-[12px] p-1 text-red-600 font-bold">*Required</p>
      )}
    </div>
  );
};
