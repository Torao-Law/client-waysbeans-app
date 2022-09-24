import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//API
import { API } from "../config/api";
// Context
import { UserContext } from "../context/userContext";

function Login({ showModal, closeModal, registerModal }) {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response.data);

      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }

      if (response.data.data.status === "customer") {
        navigate("/home");
      } else if (response.data.data.status === "admin") {
        navigate("/admin/dashboard");
      } else {
        alert("Email/Password tidak sesuai");
        navigate("/");
      }

      // Handling response here
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Modal show={showModal} onHide={closeModal}>
      <div className="px-5 pb-3">
        <p
          className="fs-3 fw-bold"
          style={{ color: "#613D2B", paddingTop: 45 }}
        >
          Login
        </p>
        <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              name="email"
              className="p-2 mb-3"
              type="email"
              placeholder="Type your email..."
              onChange={onChange}
              style={{
                textColor: "#613D2B",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
              }}
            />
            <Form.Control
              name="password"
              type="password"
              placeholder="Type your password..."
              onChange={onChange}
              style={{
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
              }}
            />
          </Form.Group>

          <Button
            type="submit"
            onClick={closeModal}
            className="fw-bold border-0 w-100 py-2 mt-3"
            style={{ backgroundColor: "#613D2B" }}
          >
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account ? Klik{" "}
          <span
            onClick={registerModal}
            className="fw-bold"
            style={{ cursor: "pointer" }}
          >
            Here
          </span>
        </p>
      </div>
    </Modal>
  );
}

export default Login;
