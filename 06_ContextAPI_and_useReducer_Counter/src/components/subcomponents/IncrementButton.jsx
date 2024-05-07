const IncrementButton = ({ handleIncrement, text }) => {
  return (
    <button
      className="bg-green-800 p-3 px-4 shadow-xl rounded-[4px] text-white"
      onClick={handleIncrement}
    >
      {text}
    </button>
  );
};
export default IncrementButton;
