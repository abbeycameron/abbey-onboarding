import "./note.css";
import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import NoteCard from "./NoteCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@material-ui/icons/Edit";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Logo = styled.h1`
  font-size: 1.9rem;
  margin: 0;
`;

export default function NoteApp() {
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [values, setvalues] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      toast.error("Please fill in the field");
      return;
    }

    if (editIndex === -1) {
      setvalues((prevVal) => {
        return [...prevVal, note];
      });
    } else {
      // Updating an existing item
      const updatedItem = [...values];
      updatedItem[editIndex] = {
        title: note.title,
        content: note.content,
      };
      setvalues(updatedItem);
      setEditIndex(-1);
    }

    setNote({
      title: "",
      content: "",
    });
  };

  const deleteNote = (id) => {
    setvalues((prevNote) => {
      return prevNote.filter((noteItem, index) => {
        return index !== id;
      });
    });
  };

  const EditNote = (id) => {
    setEditIndex(id);
    setNote({
      title: values[id].title,
      content: values[id].content,
    });
  };

  const onMapClick = () => {
    navigate("../main-page");
  };

  return (
    <>
      <div className="note-bg">
        <div className="top-section2"></div>
        <Nav style={{ position: "absolute", top: 8, left: 3 }}>
          <Logo>KFLA Parks</Logo>
        </Nav>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <input
            className={"inputButton"}
            type="button"
            onClick={onMapClick}
            value={"To Map"}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 100,
            left: 20,
            color: "rgb(91, 59, 231)",
          }}
        >
          <h1> Notes Page </h1>
          <h3> Add notes for each park visit here</h3>
        </div>
        <div className="overall-bg">
          <div>
            <form className="create-note" action="">
              <input
                name="title"
                onChange={handleChange}
                value={note.title}
                placeholder="Park Name"
                type="text"
              />
              <textarea
                name="content"
                onChange={handleChange}
                value={note.content}
                placeholder="Notes about visit..."
                rows={3}
                type="text"
              />

              <button onClick={handleSubmit}>
                {editIndex === -1 ? <AddIcon /> : <EditIcon />}
              </button>
            </form>
          </div>

          {values &&
            values.map((item, index) => {
              return (
                <NoteCard
                  key={index}
                  id={index}
                  title={item.title}
                  content={item.content}
                  onDelete={deleteNote}
                  onEdit={() => EditNote(index)}
                />
              );
            })}

          <ToastContainer autoClose={1000} />
        </div>
      </div>
    </>
  );
}
