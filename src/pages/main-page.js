import React from "react";
import { useNavigate } from "react-router-dom";
import Map from "../components/map";
import { Nav } from "react-bootstrap";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 1.9rem;
  margin: 0;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MainPage = (props) => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/"); //Back to landing page
  };
  const onNoteClick = () => {
    navigate("/notes"); //Back to landing page
  };

  //Handle pop up instructions for how to use the map.
  function HowTo() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <input
          className={"inputButton"}
          type="button2"
          value={"How To Use"}
          onClick={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              How to: Markers and Searching
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Hover your mouse over a location to see the park name. Click on a
              park's name to visit the website.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              If you have visited this park, enter the date to save the
              location. A green marker means you've visited, purple means you
              haven't.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Use the search bar to search for keywords or specific park names
              to see what parks are available.
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <div className="top-section2"></div>
      <Nav style={{ position: "absolute", top: 8, left: 3 }}>
        <Logo>KFLA Parks</Logo>
      </Nav>
      <div className="MainPage">
        <div className="MainContainer">
          <h2 style={{ color: "rgb(117, 92, 228)" }}>
            {" "}
            Provincial Parks and Conservation Areas in the Kingston Area{" "}
          </h2>
          <Nav style={{ position: "absolute", top: 0, right: 0 }}>
            <input
              className={"inputButton"}
              type="button2"
              onClick={onButtonClick}
              value={"Home Page"}
            />
          </Nav>
          <Nav style={{ position: "absolute", top: 0, right: 120 }}>
            <HowTo />
          </Nav>
          <Nav style={{ position: "absolute", top: 0, right: 240 }}>
            <input
              className={"inputButton"}
              type="button2"
              onClick={onNoteClick}
              value={"Notes"}
            />
          </Nav>
          <Map />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
