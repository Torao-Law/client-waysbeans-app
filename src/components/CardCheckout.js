import React, { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// API
import { API } from "../config/api";
// assets
import IcDelete from "../assets/image/IcDelete.png";
import Button from "../elements/Button";
// utils
import formatPrice from "../utils/formatPrice";

function CardCheckout() {
  const navigate = useNavigate();
  // const {}
  const { data: transaction, refetch } = useQuery("status", async () => {
    const response = await API.get("/transaction-status");
    return response.data.data;
  });

  // total
  let Total = transaction?.carts?.reduce((a, b) => {
    return a + b.sub_amount;
  }, 0);

  //total qty
  let qty = transaction?.carts?.reduce((a, b) => {
    return a + b.qty;
  }, 0);

  // delete item cart
  const deleteItem = async (id) => {
    await API.delete(`cart/${id}`);
    refetch();
  };

  const addQty = async (qty, id, price) => {
    // Counter state is incremented
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const newQty = qty + 1;
    const newTotal = price * newQty;
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  const lessQty = async (id, qty, price, sub_amount) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(sub_amount);
    console.log(price);
    // Counter state is decremented
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    const newTotal = sub_amount - price * newQty;
    console.log(newTotal);
    const req = JSON.stringify({
      qty: newQty,
      sub_amount: newTotal * newQty,
    });
    await API.patch(`/cart/${id}`, req, config);
    refetch();
  };

  // pay Handler
  const form = {
    status: "success",
    total: Total,
  };

  const handlePay = useMutation(async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Insert transaction data
    const body = JSON.stringify(form);

    const response = await API.patch("/transactionID", body, config);

    console.log(response);
    const token = response.data.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your owsn implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  //notification
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div style={{ marginTop: 77 }}>
      <h3>My Cart</h3>
      <p>Review order</p>
      <div className="d-flex justify-content-between">
        <div className="w-75">
          {transaction?.carts?.map((item, index) => (
            <div className="my-0">
              <hr style={{ border: "1px solid #613D2B" }} />
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                  <img
                    src={`http://localhost:5000/${item.product.image}`}
                    alt="img"
                    style={{ width: 80, height: 80 }}
                  />
                  <div className="ms-3">
                    <p className="fw-bold" style={{ color: "##613D2B" }}>
                      {item.product.name}
                    </p>
                    <div className="d-flex align-items-center">
                      <span
                        onClick={() =>
                          lessQty(
                            item.id,
                            item.qty,
                            item.product.price,
                            item.sub_amount
                          )
                        }
                        className="fs-4 fw-bold"
                        style={{ cursor: "pointer" }}
                      >
                        -
                      </span>
                      <span
                        className="rounded p-1 px-3 mx-2 fw-bold"
                        style={{ backgroundColor: "#F6E6DA" }}
                      >
                        {item.qty}
                      </span>
                      <span
                        onClick={() =>
                          addQty(item.qty, item.id, item.product.price)
                        }
                        className="fs-4 fw-bold"
                        style={{ cursor: "pointer" }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  <p style={{ color: "#974A4A" }}>
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="d-flex justify-content-end">
                    <img
                      src={IcDelete}
                      onClick={() => deleteItem(item.id)}
                      alt="delete"
                      style={{ width: 20 }}
                    />
                  </div>
                </div>
              </div>
              <hr style={{ border: "1px solid #613D2B" }} />
            </div>
          ))}
        </div>
        <div className="w-25 ms-5">
          <hr style={{ border: "1px solid #613D2B" }} />
          <div className="d-flex flex-row justify-content-between">
            <div>
              <p>Sub Total</p>
              <p>QTY</p>
            </div>
            <div className="d-flex flex-column justify-items-end">
              <p>{formatPrice(Total)}</p>
              <p>{qty}</p>
            </div>
          </div>
          <hr style={{ border: "1px solid #613D2B" }} />
          <div className="d-flex justify-content-between">
            <p>Total</p>
            <p>{formatPrice(Total)}</p>
          </div>

          <Button
            onClick={(e) => handlePay.mutate(e)}
            className="btn px-4 button-1 m-0 mt-5 p-1 w-100"
            style={{
              backgroundColor: "#613D2B",
              fontSize: 14,
              fontWeight: 700,
              color: "white",
            }}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardCheckout;
