import React from "react";
//components
import Header from "../components/Headers/CustomerHeader";
//elements
import Profile from "../elements/Profile";
import Transaction from "../elements/Transaction";

function InfoOrder() {
  return (
    <>
      <Header />;
      <div className="container" style={{ marginTop: 20}}>
        <div
          className="d-flex justify-content-between"
          style={{ padding: "0 80px" }}
        >
          <Profile />
        </div>
      </div>
    </>
  );
}

export default InfoOrder;
