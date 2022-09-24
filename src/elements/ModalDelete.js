import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete({ showModal, closeModal, setConfirmModal }) {
  const handleDelete = () => {
    setConfirmModal(true);

    closeModal();
  };

  const handleClose = () => {
    closeModal()
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModal}
      >
        <div className="p-3">
            <div>
                <h3 className="text-center">Confirm delete data</h3>
                <p>Do you want delete data ?</p>
            </div>
            <div className="d-flex justify-content-between">
            <Button className="w-75 me-3" variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button className="w-75" onClick={handleDelete} style={{backgroundColor: "#613D2B"}}>Delete</Button>
            </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalDelete;
