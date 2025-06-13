import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Modal.css";

const RecipeViewModal = ({ show, onHide }) => {
  const { recipe } = useSelector(state => state.recipeReducer);

  if (!recipe) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={recipe.image }
          alt={recipe.title}
          className="img-fluid mb-3 w-100"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Ingredients:</strong> {recipe.Ingredient}</p>
        <p><strong>Description:</strong> {recipe.desc}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary w-100" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeViewModal;
