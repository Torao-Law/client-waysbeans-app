import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

//API
import { API } from "../config/api";

// utils
import formatPrice from "../utils/formatPrice";

// context
import { UserContext } from "../context/userContext";

function Card() {
  const [state] = useContext(UserContext);
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const alertsw = () => {
    Swal.fire("error", "Please login if you have account");
  };

  return (
    <div className="container d-flex flex-row my-5 flex-wrap">
      {products?.map((item, index) => (
        <Link
          key={item.id}
          to={state.isLogin === true ? `/detailProduct/${item.id}` : ""}
          onClick={state.isLogin === false ? alertsw : ""}
          style={{ textDecoration: "none" }}
        >
          <div
            className="card"
            style={{
              width: 241,
              height: 410,
              backgroundColor: "#F6E6DA",
              border: "none",
              marginTop: 28,
              marginRight: 28,
            }}
          >
            <img
              src={item.image}
              className="card-img-top"
              alt="card"
            />
            <div className="p-3">
              <p
                className="card-text fs-5 m-0 fw-bold"
                style={{ color: "#613D2B" }}
              >
                {item.name}
              </p>
              <p className="m-0" style={{ color: "#974A4A" }}>
                {formatPrice(item.price)}
              </p>
              <p className="m-0" style={{ color: "#974A4A" }}>
                Stok : {item.qty}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
