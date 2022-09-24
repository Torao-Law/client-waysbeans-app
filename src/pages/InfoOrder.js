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
      <div className="container" style={{ marginTop: 77 }}>
        <div
          className="d-flex justify-content-between"
          style={{ padding: "0 80px" }}
        >
          <Profile />
          <Transaction />
        </div>
      </div>
    </>
  );
}

export default InfoOrder;
