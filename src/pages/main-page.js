import React from "react";
import { useNavigate } from "react-router-dom";
import Map from "./map";
import { Nav } from "react-bootstrap"

const MainPage = (props) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate("/"); //Back to landing page
  };
  return (
    <div className="MainPage">
      <div className="MainContainer">
      <h1> Provincial Parks in the Kingston Area </h1>   
      <Nav style = {{ position: 'absolute', top: 0, right: 0}}>
        <input
          className={"inputButton"}
          type="button2"
          onClick={onButtonClick}
          value={"Logout"}
        /></Nav>
        <Map />
      </div>
      </div>
    
  );
};
export default MainPage;
