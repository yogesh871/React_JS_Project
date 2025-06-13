import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Container,
  Form,
  FloatingLabel
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addNewRecipe } from "../services/Actions/RecipesActions.js";
import "./RecipeAddBook.css";

const initialState = {
  id: "",
  title: "",
  desc: "",
  Ingredient: "",
  category: "",
  image: "",
};

const AddRecipe = () => {
  const [inputForm, setInputForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChanged = e => {
    const { name, value } = e.target;
    setInputForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = Math.floor(Math.random()*100000);
    dispatch(addNewRecipe({ ...inputForm, id }));
    navigate("/");
  };

  return (
    <Container className="form-container">
      <h2 className="form-heading mt-4">Add New Recipe</h2>
      <Form onSubmit={handleSubmit} className="animated-form">

        <FloatingLabel controlId="recipeTitle" label="Recipe Title" className="mb-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={inputForm.title}
            onChange={handleChanged}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="recipeDesc" label="Recipe Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Recipe Description"
            style={{ height: '100px' }}
            name="desc"
            value={inputForm.desc}
            onChange={handleChanged}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="recipeVideo" label="Recipe Ingredients" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Recipe Ingredients"
            name="Ingredient"
            value={inputForm.Ingredient}
            onChange={handleChanged}
          />
        </FloatingLabel>

        <FloatingLabel controlId="recipeCategory" label="Recipe Category" className="mb-3">
          <Form.Select
            name="category"
            value={inputForm.category}
            onChange={handleChanged}
            required
          >
            <option value=""></option>
            {["Gujarati", "Punjabi", "South Indian", "Italian", "Maxican", "chinese"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="recipeImage" label="Recipe Image URL" className="mb-4">
          <Form.Control
            type="url"
            placeholder="Recipe Image URL"
            name="image"
            value={inputForm.image}
            onChange={handleChanged}
          />
        </FloatingLabel>

        <div className="text-center mb-4">
          <Button type="submit" className="submit-btn px-5">
            Add Recipe
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddRecipe;
