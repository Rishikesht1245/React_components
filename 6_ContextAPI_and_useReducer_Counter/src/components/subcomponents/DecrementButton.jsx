const DecrementButton = ({ handleDecrement, text }) => {
  return (
    <button
      className="bg-red-800 p-3 px-4 shadow-xl rounded-[4px] text-white"
      onClick={handleDecrement}
    >
      {text}
    </button>
  );
};
export default DecrementButton;
