import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "../services/Actions/RecipesActions.js";
import "./RecipeAddBook.css";

const initialState = { id: "", title: "", desc: "", category: "", Ingredient: "", image: "" };

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe } = useSelector(state => state.recipeReducer);
  const [inputForm, setInputForm] = useState(initialState);

  useEffect(() => {
    if (id) dispatch(getRecipe(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (recipe) setInputForm(recipe);
  }, [recipe]);

  const handleChanged = e => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateRecipe(inputForm));
    navigate("/");
  };

  return (
    <Container className="form-container">
      <h2 className="form-heading mt-4">Edit Recipe</h2>
      <Form onSubmit={handleSubmit} className="animated-form">

        <FloatingLabel controlId="editTitle" label="Recipe Title" className="mb-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={inputForm.title}
            onChange={handleChanged}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="editDesc" label="Recipe Description" className="mb-3">
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

        <FloatingLabel controlId="editIngredients" label="Recipe Ingredients" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Recipe Ingredients"
            name="Ingredient"
            value={inputForm.Ingredient}
            onChange={handleChanged}
          />
        </FloatingLabel>

        <FloatingLabel controlId="editCategory" label="Recipe Category" className="mb-3">
          <Form.Select
            name="category"
            value={inputForm.category}
            onChange={handleChanged}
            required
          >
            <option value="">Select Category</option>
            {["Gujarati", "Punjabi", "South Indian", "Italian", "Indian"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="editImage" label="Recipe Image URL" className="mb-4">
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
            Update Recipe
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditRecipe;
