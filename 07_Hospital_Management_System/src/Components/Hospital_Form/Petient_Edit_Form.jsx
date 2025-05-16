import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageData, setStorageData } from "../../Services/localStoage";
import { Form } from "react-bootstrap";

const Petient_Edit_Form = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const patients = getStorageData();
    const existingPatient = patients.find((p) => p.id === parseInt(id));
    if (existingPatient) {
      setInputForm(existingPatient);
    }
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patients = getStorageData();
    const updatedPatients = patients.map((p) =>
      p.id === parseInt(id) ? { ...inputForm, id: p.id } : p
    );
    setStorageData(updatedPatients);
    navigate("/");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Edit Patient Information</h3>

      <div className="details d-flex gap-3">
        <div className="input_details w-50">
          <label>Patient Full Name:</label>
          <input
            type="text"
            name="name"
            value={inputForm.name}
            onChange={handleInput}
            placeholder="Enter full name"
          />
        </div>
        <div className="input_details w-50">
          <label>Patient Age:</label>
          <input
            type="text"
            name="age"
            value={inputForm.age}
            onChange={handleInput}
            placeholder="Enter age"
          />
        </div>
      </div>

      <div className="details d-flex gap-3">
        <div className="input_details w-50">
          <label>Admit Date:</label>
          <input
            type="date"
            name="date"
            value={inputForm.date}
            onChange={handleInput}
          />
        </div>
        <div className="input_details w-50">
          <label>Contact Number:</label>
          <input
            type="tel"
            name="contact"
            value={inputForm.contact}
            onChange={handleInput}
            placeholder="Enter contact number"
          />
        </div>
      </div>

      <div className="input_details">
        <label>Assign Ward Number:</label>
        <Form.Group className="mb-3">
          <Form.Select
            name="wardNum"
            value={inputForm.wardNum}
            onChange={handleInput}
          >
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
          <Form.Select
            name="doctor"
            value={inputForm.doctor}
            onChange={handleInput}
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Naman Gupta (General Physician)">
              Dr. Naman Gupta (General Physician)
            </option>
            <option value="Dr. Rajiv Patel (Critical Care Specialist)">
              Dr. Rajiv Patel (Critical Care Specialist)
            </option>
            <option value="Dr. Rekha Gupta (Obstetrician/Gynecologist)">
              Dr. Rekha Gupta (Obstetrician/Gynecologist)
            </option>
            <option value="Dr. Mehul Thakkar (Pediatrician)">
              Dr. Mehul Thakkar (Pediatrician)
            </option>
            <option value="Dr. Farhan Shaikh (General Surgeon)">
              Dr. Farhan Shaikh (General Surgeon)
            </option>
            <option value="Dr. Vishal Shah (Dentist)">
              Dr. Vishal Shah (Dentist)
            </option>
            <option value="Dr. Kiran Desai (Orthopedic Surgeon)">
              Dr. Kiran Desai (Orthopedic Surgeon)
            </option>
            <option value="Dr. Anjali Mehta (Cardiologist)">
              Dr. Anjali Mehta (Cardiologist)
            </option>
            <option value="Dr. Suresh Nair (Emergency Specialist)">
              Dr. Suresh Nair (Emergency Specialist)
            </option>
          </Form.Select>
        </Form.Group>
      </div>

      <div className="input_details">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={inputForm.address}
          onChange={handleInput}
          placeholder="Enter address"
        />
      </div>

      <div className="details d-flex gap-3 mt-3">
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={inputForm.gender === "Male"}
            onChange={handleInput}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={inputForm.gender === "Female"}
            onChange={handleInput}
          />{" "}
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={inputForm.gender === "Other"}
            onChange={handleInput}
          />{" "}
          Other
        </label>
      </div>

      <button type="submit" className="petientbtn btn-primary mt-3">
        Update Patient Information
      </button>
    </form>
  );
};

export default Petient_Edit_Form;
