import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 20.745,
  lng: 78.523,
};

function Map({ isLoaded, coordinatesArr }) {
  console.log(coordinatesArr);
  const [map, setMap] = React.useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(-1);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (index) => {
    if (infoWindowOpen === index) {
      handleInfoWindowClose();
    } else {
      setInfoWindowOpen(index);
    }
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(-1);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {coordinatesArr?.map((coordinate, index) => (
        <Marker
          key={index}
          position={{ lat: coordinate?.lat, lng: coordinate?.lng }}
          onClick={() => handleMarkerClick(index)}
        >
          {infoWindowOpen === index && (
            <InfoWindow onCloseClick={handleInfoWindowClose}>
              <div className="max-w-[150px]">
                <h4 className="text-clip-2">
                  Location: {coordinate?.location}
                </h4>
                <p>Lat: {coordinate.lat}</p>
                <p>Lng: {coordinate.lng}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
}

export default React.memo(Map);
