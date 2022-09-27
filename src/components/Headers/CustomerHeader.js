import React, { useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

// Contenxt
import { UserContext } from "../../context/userContext";

// APi
import { API } from "../../config/api";

//assets
import LogoBrand from "../../assets/image/Icon.png";
import icUser from "../../assets/image/ic-user.png";
import icLogout from "../../assets/image/ic-logout.png";
import Thumbnail from "../../assets/image/thumbnail.png";
import Cart from "../../assets/image/cart.png";
import bill from "../../assets/image/bill.png"

function Header() {
  const profilPict = <img src={Thumbnail} alt="122" style={{ width: 60 }} />;
  const navigate = useNavigate();
  const [, dispatch] = useContext(UserContext);

  const homeNav = () => {
    navigate("/home");
  };

  const history = () => {
    navigate("/history");
  };

  const profile = () => {
    navigate("/profile")
  }

  const logoutNav = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const [cartNotif, setCartNotif] = useState(null);

  useEffect(() => {
    const findProduct = async () => {
      try {
        let response = await API.get("/transaction-status");
        setCartNotif(response.data.data.carts);
      } catch (e) {
        console.log(e.message);
      }
    };
    findProduct();
  }, [setCartNotif]);

  return (
    <div style={{ boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.1)" }}>
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
              style={{ width: 167, height: 47, cursor: "pointer" }}
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="me-5">
              <Link to="/checkout" style={{ textDecoration: "none" }}>
                {cartNotif?.length >= 1 && (
                  <span
                    style={{
                      backgroundColor: "#F13F3F",
                      padding: "2px 6px",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: 12,
                      fontWeight: 900,
                      top: 21,
                      right: 234,
                      position: "absolute",
                    }}
                  >
                    {cartNotif?.length}
                  </span>
                )}
                <img src={Cart} alt="Logo" style={{ width: 32 }} />
              </Link>
            </div>
            <NavDropdown id="nav-dropdown-dark-example" title={profilPict}>
              <NavDropdown.Item onClick={profile}>
                <img src={icUser} alt="User" style={{ height: 30 }} />{" "}
                <span style={{ fontWeight: 600 }}>Profile</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={history}>
                <img src={bill} alt="transaction" style={{ height: 30 }} />{" "}
                <span style={{ fontWeight: 600 }}>Transaction</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logoutNav}>
                <img src={icLogout} alt="logout" style={{ height: 30 }} />{" "}
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
