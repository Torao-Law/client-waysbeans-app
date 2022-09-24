import React, { useState } from "react";

//element
import Button from "../../elements/Button";
import ModalLogin from "../../elements/ModalLogin";
import ModalRegister from "../../elements/ModalRegister";

//assets
import LogoBrand from "../../assets/image/Icon.png";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const loginModal = () => setShowLogin(false);
  const registerModal = () => setShowRegister(false);

  function switchRegister() {
    loginModal();

    setShowRegister(true);
  }

  function switchLogin() {
    registerModal();

    setShowLogin(true);
  }

  return (
    <div style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)" }}>
      <div className="container">
        <div className="d-flex justify-content-between py-2">
          <div className="img-header" style={{ width: 163, height: 47 }}>
            <img
              src={LogoBrand}
              alt="logo-brand"
              style={{ width: "100%", height: 47 }}
            />
          </div>
          <div className="d-flex button-navigate">
            <ModalLogin
              showModal={showLogin}
              closeModal={loginModal}
              registerModal={switchRegister}
            />

            <ModalRegister
              showModal={showRegister}
              closeModal={registerModal}
              loginModal={switchLogin}
            />

            <Button
              onClick={() => setShowLogin(true)}
              className="btn px-4 me-2 m-0 p-0"
              style={{
                border: "1px solid #613D2B",
                backgroundColor: "white",
                fontSize: 14,
                fontWeight: 700,
                color: "#613D2B",
              }}
            >
              Login
            </Button>

            <Button
              onClick={() => setShowRegister(true)}
              className="btn px-4 button-1 m-0 p-0"
              style={{
                backgroundColor: "#613D2B",
                fontSize: 14,
                fontWeight: 700,
                color: "white",
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
