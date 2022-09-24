import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

//context
import { UserContext } from "./context/userContext";

// API
import { API, setAuthToken } from "./config/api";

// pages
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import DetailProduct from "./pages/DetailProduct";
import InfoOrder from "./pages/InfoOrder";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/Admin/AddProduct";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ListProduct from "./pages/Admin/ListProduct";
import Dashboard from "./pages/Admin/Dashboard";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  // console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/admin/dashboard");
      } else if (state.user.status === "customer") {
        navigate("/home");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detailProduct/:id" element={<DetailProduct />} />
      <Route path="/infoOrder" element={<InfoOrder />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin/addProduct" element={<AddProduct />} />
      <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />
      <Route path="/admin/listProduct" element={<ListProduct />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
