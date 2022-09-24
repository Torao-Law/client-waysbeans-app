import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

// Contenxt
import { UserContext } from "../../context/userContext";

// APi
import { API } from "../../config/api";

//assets
import LogoBrand from "../../assets/image/Icon.png";
import icCoffe from "../../assets/image/ic-coffe.png";
import icLogout from "../../assets/image/ic-logout.png";
import Thumbnail from "../../assets/image/thumbnail.png";
import Cart from "../../assets/image/cart.png";

function Header() {
  const profilPict = <img src={Thumbnail} alt="122" />;
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [data, setData] = useState({});

  const homeNav = () => {
    navigate("/admin/dashboard");
  };

  const addProduct = () => {
    navigate("/admin/addProduct");
  };

  const listProduct = () => {
    navigate("/admin/listProduct");
  };

  const logoutNav = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  //   console.log(`ini dari state ${state}`);
  const idx = state?.user?.id;

  const getProfile = async () => {
    const response = await API.get("/user/" + idx);
    console.log(response);
    setData(response?.data?.data?.id);
    console.log(response?.data?.data?.id);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)" }}>
      <div className="container">
        <div className="d-flex justify-content-between py-2">
          <div
            className="img-header"
            style={{ width: 163, height: 47 }}
            onClick={homeNav}
          >
            <img
              src={LogoBrand}
              alt="logo-brand"
              style={{ width: "100%", height: 47, cursor: "pointer" }}
            />
          </div>
          <div className="d-flex button-navigate">
            <NavDropdown id="nav-dropdown-dark-example" title={profilPict}>
              <NavDropdown.Item onClick={addProduct}>
                <img src={icCoffe} alt="User" style={{ height: 30 }} />{" "}
                <span style={{ fontWeight: 600 }}>Add Product</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={listProduct}>
                <img src={icCoffe} alt="User" style={{ height: 30 }} />{" "}
                <span style={{ fontWeight: 600 }}>List Product</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutNav}>
                <img src={icLogout} alt="User" style={{ height: 30 }} />{" "}
                <span style={{ fontWeight: 600 }}>Logout</span>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
