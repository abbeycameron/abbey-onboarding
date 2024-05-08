// Map.js
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import parkData from "../data/parks.json";
import "leaflet/dist/leaflet.css";
import "../App";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";



var purpleIcon = new window.L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

var greenIcon = new window.L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})
//Build a checkbox
function CheckBox() {
  const [checkedBox, setChecked] = useState(false);

  function handleCheck(e) {
    setChecked(e.target.checked);
    <Marker>
      icon={greenIcon}
    </Marker>
    
  }

  return (
    <>
    <label>
    <p><input type="checkbox" checked={checkedBox} onChange={handleCheck} />
      Visited? </p>
    </label>
    <p> {checkedBox ? 'visted' : ''} </p>
    </>
  );
}

function Map() {
  //const [activePark, setActivePark] = useState(null);

  //Build the Map
  return (
    <MapContainer
      center={[44.5, -77]}
      zoom={9}
      scrollWheelZoom={false}
      style={{ height: "00px" }}
      icon={
        new Icon({
          iconUrl: purpleIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Populate map with park data from .json file */}
      {parkData.map((park) => (
        <Marker
          position={[park.geo_point_2d.lat, park.geo_point_2d.lon]}
          key={park.map_label}
          icon={purpleIcon}
          eventHandlers={{ mouseover: (event) => event.target.openPopup(),}}
        >
          <Popup>
            {park.map_label} {"\n"} <CheckBox />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
