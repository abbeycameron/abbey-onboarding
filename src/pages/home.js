import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { TextField } from "@mui/material";
import HomeMap from "../components/homemap.js";
import Map from "../components/map.js";

const Logo = styled.h1`
  font-size: 1.9rem;
  margin: 0;
`;

const Home = (props) => {
  const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("./login");
    }
  };
  const onRegisterClick = () => {
    navigate("./register");
  };

  const onMapClick = () => {
    navigate("./main-page");
  };

  return (
    <div>
      <div className="top-section"></div>
      <div className="bg-home">
        <Nav style={{ position: "absolute", top: 8, left: 3 }}>
          <Logo>KFLA Parks</Logo>
        </Nav>

        <div className={"titleContainer"}>
          <div
            style={{
              textAlign: "center",
              position: "absolute",
              top: 200,
              color: "white",
            }}
          >
            <div>Welcome!</div>
          </div>
        </div>

        <div className={"textContainer"} style={{ height: "250px" }}>
          <div
            style={{
              //position: "absolute",
              textAlign: "center",
              color: "white",
              position: "absolute",
              top: "259px",
              left: "860px",
            }}
          >
            <h2>KFLA Parks</h2>
          </div>
        </div>

        <div className={"textContainer"} style={{ height: "100px" }}>
          <div
            style={{
              //position: "absolute",
              textAlign: "center",
              color: "white",
              position: "sticky",
              top: "200px",
            }}
          >
            <p>Check parks off your need to visit list!</p>
          </div>
        </div>

        <div
          className={"textContainer"}
          style={{ height: "300px", width: "50%" }}
        >
          <div
            style={{
              //position: "absolute",
              textAlign: "left",
              color: "black",
              position: "sticky",
              top: "525px",
              right: "60px",
            }}
          >
            <h1> About </h1>
            <p>
              Check off all parks you have visited via the interactive
              provincial park map!
            </p>
            <p>Login to see the map.</p>
          </div>
        </div>
        <div style={{ position: "absolute", top: "525px", right: "0px" }}>
          <HomeMap />
        </div>

        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onButtonClick}
            value={loggedIn ? "Log out" : "Log in"}
          />
          <input type="button" onClick={onRegisterClick} value="Sign Up" />

          <input type="button" onClick={onMapClick} value="Map" />
        </div>
      </div>
    </div>
  );
};

export default Home;
