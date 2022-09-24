import React, { useState } from "react";
// import { useQuery } from "react-query";
import { API } from "../config/api";

// component
import Header from "../components/Headers/CustomerHeader";
import CardCheckout from "../components/CardCheckout";

function Checkout() {
  const findCart = async () => {
    const response = await API.get("/transactions");
    return response.data.data;
    // return response.data.data.carts.status;
  };

  useState(() => {
    findCart();
  }, []);
  // console.log(findCart);
  console.log(findCart);

  return (
    <>
      <Header />
      <div className="container">
        {/* {findCart?.[0].status === "success" ? "halo" : "hola"} */}
        <CardCheckout />
      </div>
    </>
  );
}

export default Checkout;
