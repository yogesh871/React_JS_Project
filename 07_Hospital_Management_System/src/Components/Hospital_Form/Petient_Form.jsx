import React, { useState } from "react";
import "./petient_Form.css";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { getStorageData, setStorageData } from "../../Services/localStoage";

const Petient_Form = () => {
  const initialState = {
    name: "",
    age: "",
    gender: "",
    date: "",
    contact: "",
    address: "",
    wardNum: "",
    doctor: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000);

    setStorageData ([...getStorageData(), { ...inputForm, id }]);
   
    setInputForm(initialState);
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Patient Information</h3>

      <div className="details d-flex gap-3">
        <div className="input_details w-50">
          <label>Patient Full Name:</label>
          <input type="text" name="name" value={inputForm.name} onChange={handleInput} />
        </div>
        <div className="input_details w-50">
          <label>Patient Age:</label>
          <input type="text" name="age" value={inputForm.age} onChange={handleInput} />
        </div>
      </div>

      <div className="details d-flex gap-3">
        <div className="input_details w-50">
          <label>Admit Date:</label>
          <input type="date" name="date" value={inputForm.date} onChange={handleInput} />
        </div>
        <div className="input_details w-50">
          <label>Contact Number:</label>
          <input type="tel" name="contact" value={inputForm.contact} onChange={handleInput} />
        </div>
      </div>

      <div className="input_details">
        <label>Assign Ward Number:</label>
        <Form.Group className="mb-3">
          <Form.Select name="wardNum" value={inputForm.wardNum} onChange={handleInput}>
            <option value="">Select Ward</option>
            <option value="General Ward">General Ward</option>
            <option value="ICU">ICU</option>
            <option value="Maternity Ward">Maternity Ward</option>
            <option value="Pediatric Ward">Pediatric Ward</option>
            <option value="Surgical Ward">Surgical Ward</option>
            <option value="Dental Ward">Dental Ward</option>
            <option value="Orthopedic Ward">Orthopedic Ward</option>
            <option value="Cardiology Ward">Cardiology Ward</option>
            <option value="Emergency Ward">Emergency Ward</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="input_details">
        <label>Assign Doctor:</label>
        <Form.Group className="mb-3">
          <Form.Select name="doctor" value={inputForm.doctor} onChange={handleInput}>
            <option value="">Select Doctor</option>
            <option value="Dr. Naman Gupta (General Physician)">Dr. Naman Gupta (General Physician)</option>
            <option value="Dr. Rajiv Patel (Critical Care Specialist)">Dr. Rajiv Patel (Critical Care Specialist)</option>
            <option value="Dr. Rekha Gupta (Obstetrician/Gynecologist)">Dr. Rekha Gupta(Obstetrician/Gynecologist)</option>
            <option value="Dr. Mehul Thakkar (Pediatrician)">Dr. Mehul Thakkar(Pediatrician)</option>
            <option value="Dr. Farhan Shaikh (General Surgeon)">Dr. Farhan Shaikh(General Surgeon)</option>
            <option value="Dr. Vishal Shah (Dentist)">Dr. Vishal Shah (Dentist)</option>
            <option value="Dr. Kiran Desai (Orthopedic Surgeon)">Dr. Kiran Desai(Orthopedic Surgeon)</option>
            <option value="Dr. Anjali Mehta (Cardiologist)">Dr. Anjali Mehta (Cardiologist)</option>
            <option value="Dr. Suresh Nair (Emergency Specialist)">Dr. Suresh Nair</option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="input_details">
        <label>Address:</label>
        <input type="text" name="address" value={inputForm.address} onChange={handleInput} />
      </div>

      <div className="Details d-flex gap-3">
        <label><input type="radio" name="gender" value="Male" onChange={handleInput} /> Male</label>
        <label><input type="radio" name="gender" value="Female" onChange={handleInput} /> Female</label>
        <label><input type="radio" name="gender" value="Other" onChange={handleInput} /> Other</label>
      </div>

      <button type="submit" className="petientbtn btn-primary mt-3">Add Patient Information</button>
    </form>
  );
};

export default Petient_Form;
