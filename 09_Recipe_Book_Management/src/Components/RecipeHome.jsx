import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteRecipe, getAllRecipesAsync, viewRecipe } from "../services/Actions/RecipesActions";
import RecipeCard from "./RecipeCard";
import RecipeViewModal from "./RecipeViewModal.jsx"; 
import "./RecipeHome.css";

const Home = () => {
  const { recipes, isLoading } = useSelector(state => state.recipeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllRecipesAsync());
  }, [dispatch]);

  const handleEdit = id => navigate(`/edit-recipe/${id}`);
  const handleDelete = id => dispatch(deleteRecipe(id));

  const handleView = id => {
    dispatch(viewRecipe(id));
    setModalShow(true);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const search = searchTerm.toLowerCase();
    return (
      recipe.title.toLowerCase().includes(search) ||
      recipe.category.toLowerCase().includes(search) ||
      (recipe.Ingredient && recipe.Ingredient.toLowerCase().includes(search))
    );
  });

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Recipe Collection</h1>

      <input
        type="text"
        className="search w-25 p-2 px-3 mb-3"
        placeholder="Search Cuisine"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredRecipes.map(recipe => (
            <Col key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onview={handleView}
              />
            </Col>
          ))}
        </Row>
      )}

      <RecipeViewModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default Home;
