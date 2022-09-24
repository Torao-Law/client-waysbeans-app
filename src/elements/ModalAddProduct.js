import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

import Button from "../elements/Button";

function ModalAddProduct({ show, addOther, close }) {
  const navigate = useNavigate();

  function toListProduct() {
    close();

    navigate("/admin/listProduct");
  }

  return (
    <Modal show={show} onHide={close}>
      <div className="p-5">
        <p
          className="text-center fw-bold fs-2 mb-5"
          style={{ color: "#613D2B" }}
        >
          Success Add Product
        </p>
        <div className="d-flex justify-content-between">
        <Button
          onClick={close}
          className="py-2 rounded w-100 me-1"
          style={{
            border: "1px solid #613D2B",
            backgroundColor: "white",
            fontSize: 14,
            fontWeight: 700,
            color: "#613D2B",
          }}
        >
          Add Product
        </Button>
        <Button
          className="py-2 rounded w-100 ms-1"
          onClick={toListProduct}
          style={{
            border: "1px solid #613D2B",
            backgroundColor: "#613D2B",
            fontSize: 14,
            fontWeight: 700,
            color: "white",
          }}
        >
          List Product
        </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddProduct;
