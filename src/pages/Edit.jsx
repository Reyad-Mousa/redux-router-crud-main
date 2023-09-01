import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../state/postSlice";
import { useNavigate } from "react-router-dom";


const Edit = () => {
  function checkIfEmpty() {
    if (title !== "" && description !== "") {
      document.querySelector("button").removeAttribute("disabled");
    } else {
      document.querySelector("button").setAttribute("disabled", "disabled");
    }
  }

  const { loading: dataLoading, error: dataError, record } = usePostDetails();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (record && !title && !description) {
      setTitle(record?.title);
      setDescription(record?.description);
    }
  }, [record, title, description]);
  const formHandler = (e) => {
    e.preventDefault();
    dispatch(editPost({ id: record?.id, title, description }))
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <Loading loading={dataLoading} error={dataError}>
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
          Add POST
        </Button>
      </Form>
    </Loading>
  );
};

export default Edit;
