import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = (props) => {
  const navigate = useNavigate();
  const onButtonClick = () => {
    navigate("/login");
  };
  return (
    <div className="MainPage">
      <h1> This the main page </h1>
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button2"
          onClick={onButtonClick}
          value={"Logout"}
        />
      </div>
    </div>
  );
};
export default MainPage;
