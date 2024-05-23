import { useRef, useState } from "react";
import Map from "./components/Map";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

function App() {
  const locationRef = useRef();
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [coordinatesArr, setCoordinatesArr] = useState([]);
  const [location, setLocation] = useState("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geocoding"],
  });

  const onLoad = (autocomplete) => {
    locationRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (locationRef.current !== null) {
      const place = locationRef.current.getPlace();
      if (place) {
        setLocation(place?.formatted_address || place?.name);
      }
      const loc = place.geometry?.location;
      if (location) {
        setCoordinates({
          lat: loc.lat(),
          lng: loc.lng(),
        });
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  const handleLocationChange = (e) => {
    setLocation(e?.target?.value);
  };

  const handleCoordinatesChange = (e) => {
    const splitValues = e?.target.value?.split(",");
    setCoordinates({ lat: splitValues[0], lng: splitValues[1] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCoordinatesArr((prev) => [...prev, { ...coordinates, location }]);
    setLocation("");
    setCoordinates(null);
  };

  return (
    <main className="bg-[#0e1123] py-4 min-h-[100vh]">
      <h3 className="text-white font-black text-xl text-center mb-2">
        The Map AutoComplete
      </h3>
      {isLoaded ? (
        <div className="flex flex-col gap-6 border border-gray-600 shadow-lg rounded-sm justify-center items-center h-[90vh] max-w-[800px] lg:max-w-[1024px] w-full mx-auto p-5">
          {/* Inputs for coordinates and location */}
          <div className="flex flex-row items-center w-full justify-between gap-10">
            <div className="flex flex-col flex-1 items-start gap-1 w-full">
              <label
                htmlFor="coordinates"
                className="text-[16px] text-white font-semibold ms-1"
              >
                Coordinates :
              </label>

              <input
                id="coordinates"
                type="text"
                className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm w-full"
                placeholder="latitude, longitude"
                name="coordinates"
                onChange={handleCoordinatesChange}
                value={
                  coordinates?.lat && coordinates?.lng
                    ? `${coordinates.lat}, ${coordinates.lng}`
                    : ""
                }
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-1 w-full">
              <label
                htmlFor="location"
                className="text-white text-[16px] font-semibold ms-1"
              >
                Location :
              </label>
              {isLoaded && (
                <Autocomplete
                  onLoad={onLoad}
                  onPlaceChanged={onPlaceChanged}
                  className="w-full"
                >
                  <input
                    id="location"
                    type="text"
                    className="px-4 py-2 border focus:outline-none rounded-sm shadow-sm w-full"
                    name="location"
                    onChange={handleLocationChange}
                    value={location}
                  />
                </Autocomplete>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="bg-red-600 text-white p-2 px-4 rounded-md mt-7"
            >
              Add Marker
            </button>
          </div>

          {/* Map component comes here */}

          <Map isLoaded={isLoaded} coordinatesArr={coordinatesArr} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

export default App;
