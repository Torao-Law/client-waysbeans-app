import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

// API
import { API } from "../../config/api";

// component
import Header from "../../components/Headers/AdminHeader";

//elements
import Button from "../../elements/Button";

function UpdateProduct() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [product, setProduct] = useState({});
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  useEffect(() => {
    const findProduct = async () => {
      try {
        let response = await API.get("/product/" + id);
        setData(response.data.data);
        setProduct({
          name: response.data.data.name,
          price: response.data.data.price,
          desc: response.data.data.desc,
          qty: response.data.data.qty,
        });
        setPreview(response.data.data.image);
      } catch (e) {
        console.log(e.message);
      }
    };
    findProduct();
  }, [id]);
  console.log(data);

  const onChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (addProduct.image) {
        formData.set("image", addProduct?.image[0], addProduct?.image[0]?.name);
      }
      formData.set("name", addProduct.name);
      formData.set("desc", addProduct.desc);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      // Insert product data
      await API.patch("/product/" + id, formData, config);

      alert("berhasil UPDATE product");
      // regClose();
      navigate("/income");
    } catch (error) {
      console.log(error);
    }
  });
  console.log(addProduct.image);

  return (
    <div>
      <Header />
      <div
        className="container d-flex justify-content-around align-items-center my-5"
        style={{ marginTop: 46 }}
      >
        <div style={{ width: 472 }}>
          <p className="fw-bold fs-3 mb-3" style={{ color: "#613D2B" }}>
            Update Product
          </p>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mb-3">
              <input
                name="name"
                type="text"
                className="form-control p-2"
                placeholder="Name"
                id="name"
                onChange={onChange}
                value={product.name}
              />
            </div>
            <div className="mb-3">
              <input
                name="qty"
                type="text"
                className="form-control p-2"
                placeholder="Stok"
                id="stok"
                onChange={onChange}
                value={product.qty}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="price"
                className="form-control p-2"
                placeholder="Price"
                id="price"
                onChange={onChange}
                value={product.price}
              />
            </div>
            <div className="mb-3">
              <textarea
                name="desc"
                className="form-control p-2"
                placeholder="Description Product"
                id="description"
                onChange={onChange}
                value={product.desc}
                style={{ height: 150, resize: "none" }}
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                name="image"
                type="file"
                className="form-control"
                id="fileUpload"
                onChange={onChange}
                value={product.image}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button
                className="btn px-4 button-1 mt-5 w-75"
                style={{
                  backgroundColor: "#613D2B",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Update Product
              </Button>
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

export default UpdateProduct;
