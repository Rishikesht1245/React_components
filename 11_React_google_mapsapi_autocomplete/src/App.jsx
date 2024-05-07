import Map from "./components/Map";

function App() {
  return (
    <main className="bg-[#0e1123] py-10 min-h-[100vh]">
      <div className="flex flex-col border border-gray-600 shadow-lg rounded-sm justify-center items-center h-full max-w-[800px] w-full mx-auto p-5">
        {/* Inputs for coordinates and location */}
        <div className="flex flex-row items-center w-full justify-center gap-10">
          <div className="flex flex-col items-start gap-1 ">
            <label
              htmlFor="coordinates"
              className="text-[16px] text-white font-semibold ms-1"
            >
              Coordinates :
            </label>
            <input
              id="coordinates"
              type="text"
              className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm"
              placeholder="latitude, longitude"
              name="coordinates"
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor="location"
              className="text-white text-[16px] font-semibold ms-1"
            >
              Location :
            </label>
            <input
              id="location"
              type="text"
              className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm"
              name="location"
            />
          </div>
        </div>

        {/* Map component comes here */}
        <Map coordinates={""} />
      </div>
    </main>
  );
}

export default App;
