import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

// Config
import { API } from "../../config/api";

//component
import Header from "../../components/Headers/AdminHeader";
import Button from "../../elements/Button";
import ModalDelete from "../../elements/ModalDelete";

// utils
import formatPrice from "../../utils/formatPrice";
import Breadcrumb from "../../utils/Breadcrumb";

// assetst
import nodata from "../../assets/image/nodata.jpg";

function ListProduct() {
  const [crumbs, setCrumbs] = useState(["Dashboard", "List Product"]);

  const selected = (crumb) => {
    console.log(crumb);
  };

  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/products");
    console.log(response);
    return response.data.data;
  });

  const noData = () => {
    navigate("/admin/addProduct");
  };

  const handleUpdate = (id) => {
    navigate(`/admin/updateProduct/${id}`);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div>
      <Header />
      {products?.length !== 0 ? (
        <div className="container">
          <Breadcrumb crumbs={crumbs} selected={selected} />
          <h3 style={{ marginTop: 83, color: "#613D2B", fontWeight: 900 }}>
            List Product
          </h3>
          <table className="table table-bordered" style={{ marginTop: 52 }}>
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  No
                </th>
                <th scope="col" className="text-center">
                  Image
                </th>
                <th scope="col" className="text-center">
                  Name
                </th>
                <th scope="col" className="text-center">
                  Stok
                </th>
                <th scope="col" className="text-center">
                  Price
                </th>
                <th scope="col" className="text-center">
                  Description
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <tr>
                  <th scope="row d-flex text-align-center">1</th>
                  <td className="m-0">
                    <img
                      src={item.image}
                      alt="imgproduct"
                      style={{ width: 80 }}
                    />
                  </td>
                  <td className="m-0">{item.name}</td>
                  <td className="m-0 text-center">{item.qty}</td>
                  <td className="m-0 text-center">{formatPrice(item.price)}</td>
                  <td className="m-0">{item.desc.substring(0, 255)}</td>
                  <td className="p-0 m-0 d-flex justify-content-center align-items-center">
                    <button
                      className="border-0 m-0 px-5 rounded fw-bold text-white bg-success me-2"
                      onClick={() => {
                        handleUpdate(item.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="border-0 m-0 px-5 rounded fw-bold text-white bg-danger"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center pt-5">
          <img
            src={nodata}
            className="img-fluid"
            style={{ width: "20%" }}
            alt="empty"
          />
          <div className="mt-3">No data product</div>
          <Button
            onClick={noData}
            className="btn px-4 button-1 mt-5 w-25"
            style={{
              backgroundColor: "#613D2B",
              fontSize: 14,
              fontWeight: 700,
              color: "white",
            }}
          >
            {" "}
            Add New Product
          </Button>
        </div>
      )}
      <ModalDelete
        showModal={show}
        closeModal={handleClose}
        setConfirmModal={setConfirmDelete}
      />
    </div>
  );
}

export default ListProduct;
