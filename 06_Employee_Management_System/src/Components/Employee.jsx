import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import EmployeeModal from "./Model";
import './Employee.css';

const getStorageData = () => {
  const Employees = JSON.parse(localStorage.getItem("Employees"));
  return Employees ? Employees : [];
};

const EmployeeManagement = () => {
  const EmployeeData = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  };

  const [inputForm, setInputForm] = useState(EmployeeData);
  const [storageData, setStorageData] = useState(getStorageData());
  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setStorageData((Employees) =>
        Employees.map((emp) => (emp.id === inputForm.id ? inputForm : emp))
      );
    } else {
      let id = Math.floor(Math.random() * 10000);
      setStorageData([...storageData, { ...inputForm, id }]);
    }
    setInputForm(EmployeeData);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    setStorageData(storageData.filter(emp => emp.id !== id));
  };

  const handleEdit = (emp) => {
    setInputForm(emp);
    setIsEdit(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleView = (emp) => {
    setSelectedEmp(emp);
    setModalShow(true);
  };

  useEffect(() => {
    localStorage.setItem("Employees", JSON.stringify(storageData));
  }, [storageData]);

  return (
    <div className="employee-management-container">
      <div className="form-section">
        <div className="form-card">
          <div className="card-header">
            <h2 className="section-title">
              {isEdit ? "Edit Employee" : "Add New Employee"}
            </h2>
          </div>
          <Form onSubmit={handleSubmit} className="employee-form">
            <div className="form-row">
              <Form.Group className="mb-3 form-group">
                <Form.Label><FaUser className="input-icon" /> First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstname"
                  value={inputForm.firstname}
                  onChange={handleInput}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 form-group">
                <Form.Label><FaUser className="input-icon" /> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={inputForm.lastname}
                  onChange={handleInput}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3 form-group">
              <Form.Label><FaEnvelope className="input-icon" /> Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={inputForm.email}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 form-group">
              <Form.Label><FaMapMarkerAlt className="input-icon" /> Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Address"
                name="address"
                value={inputForm.address}
                onChange={handleInput}
                required
              />
            </Form.Group>

            <div className="form-row">
              <Form.Group className="mb-3 form-group">
                <Form.Label><FaPhone className="input-icon" /> Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Phone Number"
                  name="phone"
                  value={inputForm.phone}
                  onChange={handleInput}
                  required
                />
              </Form.Group>
            </div>

            <Button variant="primary" type="submit" className="submit-btn">
              {isEdit ? <><FaEdit /> Update Employee</> : <><FaPlus /> Add Employee</>}
            </Button>
          </Form>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <div className="table-header">
          <h2 className="section-title">Employee Directory</h2>
        </div>

        {storageData.length > 0 ? (
          <div className="table-responsive">
            <Table hover className="employee-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Employee Email</th>
                  <th>Address</th>
                  <th>Contact No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {storageData.map(emp => (
                  <tr key={emp.id} className="table-row">
                    <td>{emp.firstname}</td>
                    <td>{emp.lastname}</td>
                    <td>{emp.email}</td>
                    <td>{emp.address}</td>
                    <td>{emp.phone}</td>
                    <td className="action-buttons">
                      <Button
                        variant="outline-info"
                        onClick={() => handleView(emp)}
                        className="action-btn view-btn"
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-warning"
                        onClick={() => handleEdit(emp)}
                        className="action-btn edit-btn"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(emp.id)}
                        className="action-btn delete-btn"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="no-records">
            <div className="no-records-card">
              <h4>No employee records found</h4>
              <p>Add your first employee using the form above</p>
            </div>
          </div>
        )}
      </div>

      <EmployeeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        employee={selectedEmp}
      />
    </div>
  );
};

export default EmployeeManagement;
