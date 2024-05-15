import Map from "./components/Map";
import {
  Autocomplete,
  LoadScript,
  useJsApiLoader,
} from "@react-google-maps/api";

function App() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geocoding"],
  });

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  return (
    <main className="bg-[#0e1123] py-4 min-h-[100vh]">
      <h3 className="text-white font-black text-xl text-center mb-2">
        The Map AutoComplete
      </h3>
      <div className="flex flex-col gap-6 border border-gray-600 shadow-lg rounded-sm justify-center items-center h-[90vh] max-w-[800px] lg:max-w-[1024px] w-full mx-auto p-5">
        {/* Inputs for coordinates and location */}
        <div className="flex flex-row items-center w-full justify-center gap-10">
          <div className="flex flex-col flex-1 items-start gap-1 w-full">
            <label
              htmlFor="coordinates"
              className="text-[16px] text-white font-semibold ms-1"
            >
              Coordinates :
            </label>
            {isLoaded && (
              <Autocomplete>
                <input
                  id="coordinates"
                  type="text"
                  className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm w-full"
                  placeholder="latitude, longitude"
                  name="coordinates"
                />
              </Autocomplete>
            )}
          </div>
          <div className="flex flex-1 flex-col items-start gap-1 w-full">
            <label
              htmlFor="location"
              className="text-white text-[16px] font-semibold ms-1"
            >
              Location :
            </label>
            <input
              id="location"
              type="text"
              className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm w-full"
              name="location"
            />
          </div>
        </div>

        {/* Map component comes here */}
        <Map isLoaded={isLoaded} />
      </div>
    </main>
  );
}

export default App;
