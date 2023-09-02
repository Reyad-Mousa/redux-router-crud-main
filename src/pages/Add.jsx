import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../store/postSlice";
import { Form, Button } from "react-bootstrap";
import Loading from "../components/Loading";
const Add = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { loading, error } = useSelector((state) => state.posts);
  const formHandler = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 500);
    dispatch(createPost({ id, title, description }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // corrected typo here
        console.error(error);
      });
  };
  function checkIfEmpty() {
    if (title !== "" && description !== "") {
      document.querySelector("button").removeAttribute("disabled");
    } else {
      document.querySelector("button").setAttribute("disabled", "disabled");
    }
  }
  return (
    <Form onSubmit={formHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            checkIfEmpty();
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            checkIfEmpty();
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled>
        <Loading loading={loading} error={error}>
          Add POST
        </Loading>
      </Button>
    </Form>
  );
};

export default Add;
