import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import "./App.css";
import { useState } from "react";
import MainPage from "./pages/main-page";
import "leaflet/dist/leaflet.css";
import Register from "./pages/register";
import NoteApp from "./components/noteapp";
//import NavBar from './pages/navigation/navbar'

<>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""
  />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"
  />
  <script src="https://unpkg.com/leaflet-geosearch@latest/dist/bundle.min.js"></script>
</>;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/main-page"
            element={<MainPage setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route
            path="/register"
            element={<Register setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/notes" element={<NoteApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
