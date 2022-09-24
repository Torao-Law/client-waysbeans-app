import React from "react";

// assets
import ImgHero from "../assets/image/Jumbotron.png";

function Jumbotron() {
  return (
    <div className="container mt-5">
      <img src={ImgHero} style={{ width: "100%" }} alt="jumbotron" />
    </div>
  );
}

export default Jumbotron;
