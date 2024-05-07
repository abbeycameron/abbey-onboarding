// Map.js
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import parkData from "../data/parks.json" ;


function Map() {
  //const [activePark, setActivePark] = useState(null)
  // onClick={() => {
  //   setActivePark(park);
  // }}
  return (
    <MapContainer
      center={[50, -85]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "800px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    {parkData.map(park => (
      < Marker 
      key = {park.map_label}
      position = {[park.geo_point_2d.lon, park.geo_point_2d.lat]}
      />
    ))}

      <Marker position={[50, -85]}>
        <Popup>A sample marker </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
