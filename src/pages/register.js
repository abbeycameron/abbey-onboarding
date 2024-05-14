import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  var registerSuccess = true;

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    } else if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    } else {
      axios.get("http://127.0.0.1:8000/api/v1/accounts/users/").then((res) => {
        const users = res.data;
        users.map((users) => {
          if (users.Email === email) {
            registerSuccess = false;
          }
        });
        if (registerSuccess === true) {
          axios
            .post("http://localhost:8000/api/register", {
              Email: email,
              Password: password,
            })
            .then(function (response) {
              alert(response);
            })
            .catch(function (error) {
              alert(error);
            });
          navigate("./main-page");
        } else {
          console.log("Sign-in failed");
        }
      });
    }
  };

  return (
    <div className="overall-bg">
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Register</div>
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
            value={"Sign Up"}
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
