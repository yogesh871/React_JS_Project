import { Card, Button } from "react-bootstrap";
import "./RecipeCard.css"

const RecipeCard = ({ recipe, onEdit, onDelete,  onview }) => (


  
  <Card className="h-100 shadow-sm p-0">
    <Card.Img
      variant="top"
      src={recipe.image}
      alt={recipe.title}
      style={{ height: "200px", objectFit: "cover" }}
    />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{recipe.title}</Card.Title>
      <div className="d-flex justify-content-between align-items-center">
        <span className={` text-black mb-1 mt-1 bg-${recipe.category.toLowerCase()}`}>
         <strong > Category</strong> : {recipe.category}
        </span>
      </div>
        <span className="text-start  mb-3"> <strong>Ingredients : </strong>  {recipe.Ingredient}</span>
      <div className="mt-3 mx-auto d-flex justify-content-between ">
        <Button variant="warning" className="me-2" size="sm" onClick={() => onview(recipe.id)}>
         View
        </Button>
        <Button variant="primary" className="me-2" size="sm" onClick={() => onEdit(recipe.id)}>
        Edit
        </Button>
        <Button variant="danger" className="" size="sm" onClick={() => onDelete(recipe.id)}>
        Delete
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default RecipeCard;
