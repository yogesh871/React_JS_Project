import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import './Employee.css';

const EmployeeModal = ({ show, onHide, employee }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="employee-modal"
    >
      <div className="modal-card">
        <Modal.Header closeButton className="modal-header">
          <div className="employee-avatar">
            <FaUser size={24} />
          </div>
          <div>
            <h3>{employee?.firstname} {employee?.lastname}</h3>
            <p className="employee-position">Employee Details</p>
          </div>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <div>
              <p className="detail-label">Email</p>
              <p className="detail-value">{employee?.email}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <div>
              <p className="detail-label">Address</p>
              <p className="detail-value">{employee?.address}</p>
            </div>
          </div>
          
          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <div>
              <p className="detail-label">Phone</p>
              <p className="detail-value">{employee?.phone}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button 
            variant="primary" 
            onClick={onHide}
            className="modal-close-btn"
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EmployeeModal;