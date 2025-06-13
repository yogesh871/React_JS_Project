export const addNewRecipe = (data) => {
    return {
        type: "ADD_RECIPE",
        payload: data
    };
};

export const getAllRecipes = () => {
    return {
        type: "GET_ALL_RECIPE"
    };
};

export const deleteRecipe = (id) => {
    return {
        type: "DELETE_RECIPE",
        payload: id
    };
};

export const getRecipe = (id) => {
    return {
        type: "GET_RECIPE",
        payload: id
    };
};

export const updateRecipe = (data) => {
    return {
        type: "UPDATE_RECIPE",
        payload: data
    };
};

export const loading = () => {
    return {
        type: "LOADING"
    };
};

export const viewRecipe = (id) => {
    return {
        type: "VIEW_RECIPE",
        payload: id
    };
};


export const getAllRecipesAsync = () => {
    return (dispatch) => {
        dispatch(loading());

        setTimeout(() => {
            dispatch(getAllRecipes());
        }, 1000);
    };
};
