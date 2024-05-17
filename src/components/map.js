import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import parkData from "../data/parks.json";
import "leaflet/dist/leaflet.css";
import "../App";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

import SearchBar from "./search-bar";
import { useMap } from "react-leaflet";
import { Note } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

var purpleIcon = new window.L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

var greenIcon = new window.L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
//Popup box to handle input for each location
function CheckBox({ markerId, visited, onSaveNotes, onChange }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showInput, setShowInput] = useState(true);
  function DateBox() {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }

  const handleSaveNotes = () => {
    onSaveNotes(markerId, selectedDate);
    //setShowInput(false); // Hide the button and date box after saving
    return { visited };
  };
  const onNoteClick = () => {
    navigate("/notes"); //Back to landing page
  };

  return (
    <label>
      <p>
        <input type="checkbox" checked={visited} onChange={onChange} />
        Visited?
      </p>
      {visited && showInput ? (
        <div>
          <p> Enter date below to save location:</p>
          <DateBox />

          <input
            className={"inputButton"}
            type="button3"
            onClick={handleSaveNotes}
            value={"Save"}
          />
          <input
            className={"inputButton"}
            type="button3"
            onClick={onNoteClick}
            value={"Add Notes"}
          />
        </div>
      ) : (
        <p></p>
      )}
    </label>
  );
}

function Map() {
  const [dates, setDates] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredParkData, setFilteredParkData] = useState([]);
  const [notes, setNotes] = useState("");

  const handleMarkerCheck = (markerId) => (e) => {
    const isChecked = e.target.checked;
    setDates((prevNotes) => ({
      ...prevNotes,
      [markerId]: {
        ...prevNotes[markerId],
        visited: isChecked,
      },
    }));
  };

  const handleSaveNotes = (markerId, date) => {
    setDates((prevNotes) => ({
      ...prevNotes,
      [markerId]: {
        visited: true,
        date: date,
      },
    }));
  };
  const handleSearch = (searched) => {
    console.log("Searched data:", searched);
    if (searched.length > 0) {
      const lat = searched[0].geo_point_2d.lat;
      const long = searched[0].geo_point_2d.lon;
    }
    return searched.map((park) => (
      <div key={park.map_label}>
        <p>{park.map_label}</p>
      </div>
    ));
  };

  useEffect(() => {
    const searched = parkData.filter(
      (park) => park.map_label.toLowerCase().includes(searchText.toLowerCase()) //Convert to lowercase for search ease
    );
    setFilteredParkData(searched);
    console.log("Filtered park data:", searched);
  }, [searchText]);

  return (
    <div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        filteredParkData={filteredParkData}
      />
      {/* Display search results */}
      {searchText && (
        <div>
          {filteredParkData.length > 0 ? (
            <p>
              Results found for "{searchText}": {filteredParkData.length}{" "}
              park(s)
            </p>
          ) : (
            <p>No results found for "{searchText}"</p>
          )}
          {/* Render the search results */}
          {handleSearch(filteredParkData)}
        </div>
      )}
      {/* Build map */}
      <MapContainer
        center={[44.5, -77]}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: "800px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {parkData.map((park) => {
          const markerId = park.map_label;
          const markerDate = dates[markerId] || {};
          const visited = markerDate.visited || false;
          const markerIcon = visited ? greenIcon : purpleIcon;
          const parkLink = park.map_link;
          const markerNotes = notes[markerId];

          return (
            <Marker
              key={markerId}
              position={[park.geo_point_2d.lat, park.geo_point_2d.lon]}
              icon={markerIcon}
              eventHandlers={{ mouseover: (event) => event.target.openPopup() }}
            >
              <Popup>
                <a href={parkLink}> {markerId} </a>

                <CheckBox
                  markerId={markerId}
                  visited={visited}
                  onSaveNotes={handleSaveNotes}
                  onChange={handleMarkerCheck(markerId)}
                />
                {visited && markerDate.date && (
                  <p>
                    Day Visited:{" "}
                    {new Date(markerDate.date).toLocaleDateString()}
                  </p>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
