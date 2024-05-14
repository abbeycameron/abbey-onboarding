import axios from "axios";
import useCookies from "react";

//const [cookies, setCookie, removeCookie] = useCookies();

// This function sets the authentication token in cookies
export function storeToken(data) {
  document.cookie = `auth_token=${data.auth_token}; HttpOnly; SameSite=Strict; Secure`;
}

// This function deletes the authentication token from cookies
export function deleteToken() {
  document.cookie =
    "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const AuthCreds = {
  email: "string",
  password: "string",
};

// Function to log in
export async function logIn(AuthCreds) {
  try {
    const res = await axios.post(
      process.env.API_BASE_URL + "/api/auth/token/login/",
      AuthCreds
    );
    storeToken(res.data);
    return res;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// Function to log out
export async function logOut() {
  try {
    await axios.post("/api/auth/token/logout/");
    deleteToken();
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}
