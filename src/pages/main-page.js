import React from "react";
import { useNavigate } from "react-router-dom";
import Map from "./map";

const MainPage = (props) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate("/"); //Back to landing page
  };
  return (
    <div className="MainPage">
      <h1> Provincial Parks in the Kingston Area </h1>

      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button2"
          onClick={onButtonClick}
          value={"Logout"}
        />
        <Map />
      </div>
    </div>
  );
};
export default MainPage;
