import React, { useState } from "react";
import { useMutation } from "react-query";
// API
import { API } from "../../config/api";
// component
import Header from "../../components/Headers/AdminHeader";
//elements
// import Button from "../../elements/Button";
import ModalNotif from "../../elements/ModalAddProduct";
// assets
import imgDefault from "../../assets/image/addproduct.jpg";

function AddProuct() {
  const [preview, setPreview] = useState(imgDefault);
  const [addProduct, setAddProduct] = useState({
    name: "",
    qty: "",
    price: "",
    desc: "",
    image: "",
  });
  const [showDialog, setShowDialog] = useState(false);

  const handleDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  const showConfirmModal = () => {
    handleDialog();
  };

  const onChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Data body
      const formData = new FormData();
      formData.set("image", addProduct.image[0], addProduct.image[0].name);
      formData.set("name", addProduct.name);
      formData.set("price", addProduct.price);
      formData.set("qty", addProduct.qty);
      formData.set("desc", addProduct.desc);
      console.log(addProduct);

      // Insert data user to database
      const response = await API.post("/product", formData, config);
      if (response === 200) {
        setAddProduct({
          name: "",
          qty: "",
          price: "",
          desc: "",
          image: "",
        });
      }

      // Handling response here
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Header />
      <div
        className="container d-flex justify-content-around align-items-center my-5"
        style={{ marginTop: 46 }}
      >
        <div style={{ width: 472 }}>
          <p className="fw-bold fs-3 mb-3" style={{ color: "#613D2B" }}>
            Add Product
          </p>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div class="mb-3">
              <input
                name="name"
                type="text"
                className="form-control p-2"
                placeholder="Name"
                id="name"
                onChange={onChange}
              />
            </div>
            <div class="mb-3">
              <input
                name="qty"
                type="text"
                className="form-control p-2"
                placeholder="Stok"
                id="stok"
                onChange={onChange}
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                name="price"
                className="form-control p-2"
                placeholder="Price"
                id="price"
                onChange={onChange}
              />
            </div>
            <div class="mb-3">
              <textarea
                name="desc"
                className="form-control p-2"
                placeholder="Description Product"
                id="description"
                onChange={onChange}
                style={{ height: 150, resize: "none" }}
              ></textarea>
            </div>
            <div class="mb-3">
              <input
                name="image"
                type="file"
                class="form-control"
                id="fileUpload"
                onChange={onChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ModalNotif show={showDialog} close={handleCloseDialog} />

              <button
                type="submit"
                onClick={() => showConfirmModal()}
                className="btn px-4 button-1 mt-5 w-75"
                style={{
                  backgroundColor: "#613D2B",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
        <div style={{ width: 436, height: 555 }}>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt={preview}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProuct;
