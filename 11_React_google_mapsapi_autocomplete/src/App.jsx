import { useCallback, useRef, useState } from "react";
import Map from "./components/Map";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { fromLatLng } from "react-geocode";

const libraries = ["places", "geocoding"];

function App() {
  const locationRef = useRef();
  //for marker in map
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  // for input field in form
  const [coordinateStr, setCoordinateStr] = useState("");
  // for tracking all markers
  const [coordinatesArr, setCoordinatesArr] = useState([]);
  const [location, setLocation] = useState("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
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
        const lat = loc?.lat();
        const lng = loc?.lng();
        setCoordinates({
          lat,
          lng,
        });
        setCoordinateStr(`${lat}, ${lng}`);
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  // fetch location from coordinates using geocode
  const fetchLocationData = useCallback(async (lat, lng) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    try {
      const response = await fromLatLng(lat, lng, apiKey);
      const formattedAddress = response.results[0].formatted_address;
      setLocation(formattedAddress);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e?.target?.value);
  };

  const handleCoordinatesChange = (e) => {
    const [lat, lng] = e?.target.value?.split(",");
    // for displaying in input
    setCoordinateStr(e?.target?.value);
    // for providing to map
    setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lng) });
    if (coordinates?.lat && coordinates?.lng) {
      fetchLocationData(coordinates?.lat, coordinates?.lng);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCoordinatesArr((prev) => [...prev, { ...coordinates, location }]);
    setLocation("");
    setCoordinates(null);
    setCoordinateStr("");
  };

  console.log(coordinatesArr);

  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

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
                onChange={handleCoordinatesChange}
                value={coordinateStr}
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
