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
  const [map, setMap] = React.useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(-1);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (index) => {
    setInfoWindowOpen(index);
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
          position={{ lat: coordinate?.lat, lng: coordinate?.lng }}
          onClick={handleMarkerClick}
        >
          <InfoWindow position={{ lat: coordinate?.lat, lng: coordinate?.lng }}>
            {infoWindowOpen === index && (
              <InfoWindow onCloseClick={handleInfoWindowClose}>
                <div>
                  <h4>{coordinate?.location}</h4>
                  <p>Lat: {coordinate.lat}</p>
                  <p>Lng: {coordinate.lng}</p>
                </div>
              </InfoWindow>
            )}
          </InfoWindow>
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
