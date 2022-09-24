import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Modal, Form } from "react-bootstrap";

import Button from "./Button";

function Register({ showModal, closeModal, loginModal }) {
  const [form, setForm] = useState({
    name: "",
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
      await API.post("/register", body, config);

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
          Register
        </p>
        <Form className="mt-4" onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              className="p-2 mb-3"
              type="text"
              name="name"
              placeholder="Type your Name..."
              onChange={onChange}
              style={{
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
              }}
            />
            <Form.Control
              className="p-2 mb-3"
              type="email"
              name="email"
              placeholder="Type your email..."
              onChange={onChange}
              style={{
                textColor: "#613D2B",
                backgroundColor: "rgba(97, 61, 43, 0.25)",
                border: "2px solid #613D2B",
              }}
            />

            <Form.Control
              className="p-2 mb-3"
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
            onClick={closeModal}
            className="fw-bold border-0 rounded text-white w-100 py-2 mt-3"
            style={{ backgroundColor: "#613D2B" }}
          >
            Register
          </Button>
          <p className="text-center mt-3">
            Don't have an account ? Klik{" "}
            <span
              onClick={loginModal}
              className="fw-bold"
              style={{ cursor: "pointer" }}
            >
              Here
            </span>
          </p>
        </Form>
      </div>
    </Modal>
  );
}

export default Register;
