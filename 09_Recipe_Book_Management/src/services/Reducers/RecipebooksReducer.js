const initialState = {
    recipes: [],
    recipe: null,
    isLoading: false
};

const recipeReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case "ADD_RECIPE":
            let newRecipes = [...state.recipes, action.payload];
            localStorage.setItem("recipes", JSON.stringify(newRecipes));
            return {
                ...state,
                recipes: newRecipes
            };

        case "GET_ALL_RECIPE": 
            let allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
            return {
                ...state,
                recipes: allRecipes,
                isLoading: false
            };

        case "GET_RECIPE": 
            let getRecipes = JSON.parse(localStorage.getItem("recipes"));
            let singleRecipe = getRecipes.find(recipe => recipe.id == action.payload);
            return {
                ...state,
                recipe: singleRecipe
            };

        case "DELETE_RECIPE":
            let getAllRecipes = JSON.parse(localStorage.getItem("recipes"));
            let deletedRecipes = getAllRecipes.filter(recipe => recipe.id != action.payload);
            localStorage.setItem("recipes", JSON.stringify(deletedRecipes));
            return {
                ...state,
                recipes: deletedRecipes
            };

            case "VIEW_RECIPE":
                let recipesFromStorage = JSON.parse(localStorage.getItem("recipes")) || [];
                let recipeDetails = recipesFromStorage.find(recipe => recipe.id === action.payload);
                return {
                    ...state,
                    recipe: recipeDetails
                };
            


        case "UPDATE_RECIPE":
            let storedRecipes = JSON.parse(localStorage.getItem("recipes"));
            let updatedRecipes = storedRecipes.map(recipe => {
                if(recipe.id == action.payload.id){
                    return action.payload;
                } else {
                    return recipe;
                }
            });
            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
            return {
                ...state,
                recipes: updatedRecipes,
                recipe: null
            };

        case "LOADING": 
            return {
                ...state,
                isLoading: true
            };

        default:
            return state;
    }
};

export default recipeReducer;
