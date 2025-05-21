import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStorageData, setStorageData } from "../../Services/localStoage";
import { Button, Table, Container, Navbar, Modal } from "react-bootstrap";
import { FaUser, FaPhone, FaEye, FaEdit, FaTrash, FaPlus, FaCaretUp, FaCaretDown } from "react-icons/fa";
import './Petient_Form.css';

const Petient = () => {
  const [petientDatas, setPetientDatas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorageData();
    setPetientDatas(data);
  }, [location]);

  const handleNavigate = () => navigate("/petientForm");
  const handleEdit = (id) => navigate(`/petientEditForm/${id}`);
  const handleDelete = (id) => {
    const updatedData = getStorageData().filter(p => p.id !== id);
    setStorageData(updatedData);
    setPetientDatas(updatedData);
  };

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleChanged = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const data = getStorageData();
    const filteredData = data.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.date.toLowerCase().includes(search.toLowerCase())
    );
    setPetientDatas(filteredData);
    setCurrentPage(1);
    setSearch("");
  };

  const handleAllData = () => {
    setPetientDatas(getStorageData());
  };

  const handleSorting = (type, field) => {
    const data = [...petientDatas];
    const sorted = data.sort((a, b) => {
      if (field === "age" || field === "date") {
        return type === "asc" ? a[field] - b[field] : b[field] - a[field];
      } else {
        return type === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    });
    setPetientDatas(sorted);
  };

  const totalPages = Math.ceil(petientDatas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = petientDatas.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Hospital Management</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button variant="primary" className="petientbtn admit" onClick={handleNavigate}>
              <FaPlus className="me-2" />
              Admit Patient
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="patient-section py-3 container mt-5 d-flex justify-content-between">
        <h3 className="section-title mb-0">Find Patient Data</h3>
        <div className="serch w-50 d-flex justify-content-end gap-2">
          <input
            type="text"
            className="px-3 py-2"
            placeholder="Search Patient Data"
            value={search}
            style={{ width: "60%" }}
            onChange={handleChanged}
          />
          <Button className="serch-btn" onClick={handleSearch}>Search</Button>
          <Button onClick={handleAllData}>All Data</Button>
        </div>
      </div>

      <div className="patient-section container mt-1">
        <h2 className="section-title">Patient Records</h2>
        {currentItems.length > 0 ? (
          <Table hover className="patient-table">
            <thead>
              <tr>
                <th>
                  <FaUser /> Name
                  <button onClick={() => handleSorting("asc", "name")} className="up-btn ms-4 me-1">
                    <FaCaretUp className="text-light" />
                  </button>
                  <button className="down-btn" onClick={() => handleSorting("desc", "name")}>
                    <FaCaretDown className="text-light" />
                  </button>
                </th>
                <th>
                  Age
                  <button onClick={() => handleSorting("asc", "age")} className="up-btn ms-4 me-1">
                    <FaCaretUp className="text-light" />
                  </button>
                  <button className="down-btn" onClick={() => handleSorting("desc", "age")}>
                    <FaCaretDown className="text-light" />
                  </button>
                </th>
                <th>Gender</th>
                <th><FaPhone /> Contact</th>
                <th>Admit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="d-flex flex-column">
                      <div className="name">{patient.name}</div>
                      <div className="address">{patient.address}</div>
                    </div>
                  </td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.contact}</td>
                  <td>{patient.date}</td>
                  <td className="d-flex action-btn">
                    <Button variant="warning" onClick={() => handleEdit(patient.id)} className="me-2 fs-5">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(patient.id)} className="me-2 fs-5">
                      <FaTrash />
                    </Button>
                    <Button size="sm" className="btn-skyblue fs-5" onClick={() => handleView(patient)}>
                      <FaEye />
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

      {totalPages > 1 && (
        <div className="pagination-controls d-flex justify-content-center mb-3 mt-5 gap-3">
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              variant={currentPage === pageNum ? " primary" : "outline-primary"}
            >
              {pageNum}
            </Button>
          ))}
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}

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
                  <h5 className="mb-0"><i className="fas fa-id-card me-2"></i>Basic Information</h5>
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
                  <h5 className="mb-0"><i className="fas fa-hospital me-2"></i>Medical Information</h5>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="" onClick={handleClose}>
            <i className="fas fa-times me-2"></i>Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Petient;
