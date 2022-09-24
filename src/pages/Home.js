import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Contenxt
import { UserContext } from "../context/userContext";

// component
import Header from "../components/Headers/CustomerHeader";
import Jumbotron from "../components/Jumbotron";

//elements
import Card from "../elements/Card";

function Home() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);

  const checkAuth = () => {
    if (state.isLogin === true) {
      navigate("/");
    }
  };
  checkAuth();

  return (
    <>
      <Header />
      <Jumbotron />
      <Card />
    </>
  );
}

export default Home;
