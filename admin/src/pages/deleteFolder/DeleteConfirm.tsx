import {
    faTrash,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "../common.css";

const DeleteConfirm = ({ onDelete, id }) => {
  const [show, setShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id); // Truyền id vào hàm onDelete
      toast.success("Successfully deleted!");
      handleClose();
    } catch (error) {
      toast.error("An error occured");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Button để hiển thị modal */}
      <Button
        variant="danger"
        size="sm"
        onClick={handleShow}
        className="custom-hover"
        style={{ position: "relative" }}
      >
        <FontAwesomeIcon icon={faTrash} />
        <span className="title-edit">Delete</span>
      </Button>

      {/* Modal xác nhận */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="modal-header-center"
          style={{ borderTop: "2px solid red" }}
        >
          <Modal.Title>
            <div style={{ marginLeft: "58px", marginTop: "15px" }}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-danger pb-2"
                style={{
                  fontSize: "75px",
                }}
              />
              <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                Confirm delete
              </p>
              <p style={{ fontSize: "20px", color: "grey" }}>
                Do you really want to delete this record?
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body></Modal.Body> */}
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isDeleting}
            style={{ backgroundColor: "white" }}
          >
            <span style={{ color: "black" }}>Cancel</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirm;
