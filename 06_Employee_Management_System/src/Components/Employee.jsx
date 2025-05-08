import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaEye, FaEdit, FaTrash } from "react-icons/fa";
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
    phone: ""
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
        <div className="form-card w-50 mx-auto">
          <h2 className="section-title">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h2>
          <Form onSubmit={handleSubmit} className=" mx-auto" >
            <Form.Group className="mb-3">
              <Form.Label><FaUser className="input-icon" /> First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your First Name"
                name="firstname"
                value={inputForm.firstname}
                onChange={handleInput}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label><FaUser className="input-icon" /> Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Last Name"
                name="lastname"
                value={inputForm.lastname}
                onChange={handleInput}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
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
            
            <Form.Group className="mb-3">
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
            
            <Form.Group className="mb-3">
              <Form.Label><FaPhone className="input-icon" /> Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter Your Mobile Number"
                name="phone"
                value={inputForm.phone}
                onChange={handleInput}
                required
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="submit-btn"
            >
              {isEdit ? "Update Employee" : "Add Employee"}
            </Button>
          </Form>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-section">
        <h2 className="section-title">Employee Directory</h2>
        {storageData.length > 0 ? (
          <div className="table-responsive">
            <Table hover className="employee-table">
              <thead>
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {storageData.map(emp => (
                  <tr key={emp.id} className="table-row">
                    <td>
                      <div className="employee-name">
                        {emp.firstname} 
                      </div>
                      <div className="employee-address"></div>
                    </td>
                    <td>{emp.lastname}</td>
                    <td>{emp.email}</td>
                    <td>{emp.address}</td>
                    <td>{emp.phone}</td>
                    <td className="action-buttons">
                      <Button 
                        variant="outline-info" 
                        onClick={() => handleView(emp)}
                        className="action-btn"
                      >
                        <FaEye /> View
                      </Button>
                      <Button 
                        variant="outline-warning" 
                        onClick={() => handleEdit(emp)}
                        className="action-btn"
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        onClick={() => handleDelete(emp.id)}
                        className="action-btn"
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="no-records">
            <h4>No employee records found</h4>
          </div>
        )}
      </div>

      {/* Modal Component */}
      <EmployeeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        employee={selectedEmp}
      />
    </div>
  );
};

export default EmployeeManagement;