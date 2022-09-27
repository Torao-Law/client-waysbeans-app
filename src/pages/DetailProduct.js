import React, { useEffect, useState } from "react";

// component
import Header from "../components/Headers/CustomerHeader";
// import DetailOrder from "../components/DetailOrder";
// import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

// API
import { API } from "../config/api";

// utils\
import formatPrice from "../utils/formatPrice";

function DetailProduct() {
  let navigate = useNavigate();
  const { id } = useParams();
  // Product Fetch
  const [product, SetProduct] = useState();
  const findProduct = async () => {
    try {
      let response = await API.get("/product/" + id);
      SetProduct(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    findProduct();
  }, []);

  // Check Transaction
  const [transaction, setTransaction] = useState();
  const getTrans = async () => {
    try {
      let response = await API.get("/transaction-status");
      setTransaction(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getTrans();
  }, []);

  console.log(transaction);

  // Handle for Add to cart
  const handleAddToCart = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      await API.post("/transaction", config);

      const data = {
        product_id: product.id,
        qty: 1,
        sub_amount: product.price,
      };

      const body = JSON.stringify(data);

      await API.post("/cart", body, config);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center mb-5"
        style={{ marginTop: 92, padding: "0 100px" }}
      >
        <div className="left-content">
          <div className="img-wrapper" style={{ width: 436, height: 555 }}>
            <img
              src={product?.image}
              alt="imgproduct"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="ms-5 right-content">
          <div className="right-wrapper">
            <h1 className="fw-bold" style={{ color: "#613D2B" }}>
              {product?.name}
            </h1>
            <p style={{ color: "#974A4A", fontSize: 14 }}>
              Stok {product?.qty}
            </p>
            <p className="mt-5" style={{ textAlign: "justify", fontSize: 14 }}>
              {product?.desc}
            </p>
            <p
              className="my-4 text-end"
              style={{ color: "#974A4A", fontWeight: 900, fontSize: 24 }}
            >
              {formatPrice(product?.price)}
            </p>
          </div>
          <button
            type="submit"
            onClick={(e) => handleAddToCart.mutate(e)}
            className="rounded-3 fw-bold border-0 py-2 w-100 mt-3 text-white"
            style={{ backgroundColor: "#613D2B" }}
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
