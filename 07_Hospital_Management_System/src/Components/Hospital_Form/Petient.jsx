import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStorageData, setStorageData } from "../../Services/localStoage";
import { Button, Table, Container, Navbar } from "react-bootstrap";
import { FaUser, FaPhone, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import { Modal } from "react-bootstrap";

import './Petient_Form.css';

const Petient = () => {
  const [petientDatas, setPetientDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPetientDatas(getStorageData());
  }, [location]);

  const handleNavigate = () => navigate("/petientForm");

  const handleEdit = (id) => navigate(`/petientEditForm/${id}`);

  const handleDelete = (id) => {
    const updateData = getStorageData().filter(p => p.id !== id);
    setStorageData(updateData);
    setPetientDatas(updateData);
  };



  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);


  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Hospital Management</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="primary"  className="petientbtn"onClick={handleNavigate}>
                <FaPlus className="me-2" />
                Admit Patient
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="patient-section container mt-5">
        <h2 className="section-title">Patient Records</h2>
        {petientDatas.length > 0 ? (
          <Table hover className="patient-table">
            <thead>
              <tr>
                <th><FaUser /> Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th><FaPhone /> Contact</th>
                <th>Addmit_Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {petientDatas.map(patient => (
                <tr key={patient.id} className="">
                  <td>
                    <div className="d-flex flex-column justify-content-center ">

                      <div className="name">
                        {patient.name}
                      </div>
                      <div className="address">
                        {patient.address}
                      </div>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.date}</td>
                  <td className="d-flex action-btn">
                    <Button variant="warning"onClick={() => handleEdit(patient.id)} className="me-2 fs-5">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(patient.id)} className=" me-2  fs-5" >
                      <FaTrash />
                    </Button>
                    <Button size="sm" className="btn-skyblue   fs-5" onClick={() => handleView(patient)}>
                      <FaEye  />
                    </Button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No patient records found. Admit your first patient!</p>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose} centered size="lg" className="patient-modal">
  <Modal.Header closeButton className="modal-header">
    <Modal.Title className="modal-title">
      <i className="fas fa-user-injured me-2"></i>
      Patient Profile
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="p-4">
    {selectedPatient && (
      <div className="patient-profile-container">
        <div className="patient-basic-info card mb-4">
          <div className="card-header text-white">
            <h5 className="mb-0">
              <i className="fas fa-id-card me-2"></i>
              Basic Information
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-signature me-2"></i>Name:</span>
                  <span className="info-value">{selectedPatient.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-birthday-cake me-2"></i>Age:</span>
                  <span className="info-value">{selectedPatient.age} years</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-venus-mars me-2"></i>Gender:</span>
                  <span className="info-value">{selectedPatient.gender}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-phone me-2"></i>Contact:</span>
                  <span className="info-value">{selectedPatient.contact}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-map-marker-alt me-2"></i>Address:</span>
                  <span className="info-value">{selectedPatient.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-medical-info card mb-4">
          <div className="card-header text-white">
            <h5 className="mb-0">
              <i className="fas fa-hospital me-2"></i>
              Medical Information
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-calendar-day me-2"></i>Admit Date:</span>
                  <span className="info-value">{selectedPatient.date}</span>
                </div>
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-procedures me-2"></i>Ward Number:</span>
                  <span className="info-value">{selectedPatient.wardNum}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-item">
                  <span className="info-label"><i className="fas fa-user-md me-2"></i>Assigned Doctor:</span>
                  <span className="info-value">Dr. {selectedPatient.doctor}</span>
                </div>
                <div className="info-item">
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    )}
  </Modal.Body>
  <Modal.Footer className="modal-footer">
    <Button variant="" onClick={handleClose}>
      <i className="fas fa-times me-2"></i>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default Petient;
