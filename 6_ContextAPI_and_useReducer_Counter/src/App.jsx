import Counter from "./components/Counter";

function App() {
  return (
    <section className="bg-gray-900 h-screen w-screen flex justify-center items-center">
      <div className="bg-white w-[100%] max-w-md shadow-2xl rounded-[5px]">
        <Counter />
      </div>
    </section>
  );
}

export default App;
