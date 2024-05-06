import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "./main-page";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Call the server API to check if the given email ID already exists
  /*
  const checkAccount = (callback) => {
    fetch("http://localhost:3080/check-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists);
      });
  };
*/
  const onButtonClick = () => {
    if ("" === email) {
      setEmailError("Please enter email.");
      return;
    }
    else if ("" === password) {
      setPasswordError("Please enter password.");
      return;
    } else {
      navigate("/main-page");
    }
    /*
    setEmailError("");
    setPasswordError("");

    checkAccount((accountExists) => {
      if (accountExists) logIn();
      else if (window.confirm("An account with this email doesnt exist")) {
        logIn();
      }
    });

    // Log in a user using email and password
    const logIn = () => {
      fetch("http://localhost:3080/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ("success" === r.message) {
            localStorage.setItem(
              "user",
              JSON.stringify({ email, token: r.token })
            );
            props.setLoggedIn(true);
            props.setEmail(email);
            navigate("/");
          } else {
            window.alert("Wrong email or password");
          }
        });
    };*/
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
