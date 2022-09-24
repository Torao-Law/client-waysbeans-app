import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// elements
import Button from "../elements/Button";
// API
import { API } from "../config/api";

// utils\
import formatPrice from "../utils/formatPrice";

function DetailOrder() {
  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get(`/product/${id}`);
    console.log(response.data.data);
    // return response.data.data;
  });

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center mb-5"
        style={{ marginTop: 92, padding: "0 100px" }}
      >
        <div className="left-content">
          <div className="img-wrapper" style={{ width: 436, height: 555 }}>
            <img
              src={product.image}
              alt="imgproduct"
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="ms-5 right-content">
          <div className="right-wrapper">
            <h1 className="fw-bold" style={{ color: "#613D2B" }}>
              {product.name}
            </h1>
            <p style={{ color: "#974A4A", fontSize: 14 }}>
              Stok {product.stok}
            </p>
            <p className="mt-5" style={{ textAlign: "justify", fontSize: 14 }}>
              {product.description}
            </p>
            <p
              className="my-4 text-end"
              style={{ color: "#974A4A", fontWeight: 900, fontSize: 24 }}
            >
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            className="rounded-3 fw-bold border-0 py-2 w-100 mt-3 text-white"
            style={{ backgroundColor: "#613D2B" }}
          >
            Add Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default DetailOrder;
