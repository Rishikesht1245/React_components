export const Button = ({ type, text, className, handleClick }) => {
  return (
    <button
      onClick={() => handleClick && handleClick()}
      type={type}
      className={`${className} text-white font-bold p-1 rounded-[5px] shadow-2xl`}
    >
      {text}
    </button>
  );
};
