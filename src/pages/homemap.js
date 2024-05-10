import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import parkData from "../data/parks.json";
import "leaflet/dist/leaflet.css";
import "../App";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

var purpleIcon = new window.L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});


function Map() {
  const [markerStates, setMarkerStates] = useState({});


  return (
    <MapContainer
      center={[44.5, -77]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "860px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {parkData.map((park) => (
        <Marker
          position={[park.geo_point_2d.lat, park.geo_point_2d.lon]}
          key={park.map_label}
          icon={purpleIcon}
          eventHandlers={{ mouseover: (event) => event.target.openPopup() }}
        >
          <Popup>
            {park.map_label} {"\n"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;