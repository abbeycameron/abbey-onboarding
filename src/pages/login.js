import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async (props) => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }
    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    } else {
      await axios
        .post("http://127.0.0.1:8000/api/v1/accounts/users/", {
          Email: email,
          Password: password,
        })
        .then(function (response) {
          alert(response);
          console.log(response);
          navigate("./main-page");
        })
        .catch(function (error) {
          alert("BAD" + JSON.stringify(error));
        });
      //navigate("./main-page");
    }
    //auth stuff
  };

  return (
    <div className="overall-bg">
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
            type="password"
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
            value={"Sign in"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
