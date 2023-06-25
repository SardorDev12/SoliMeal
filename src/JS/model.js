import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: {},
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      source: recipe.source_url,
    };
  } catch (err) {
    throw err;
  }
};

export const loadRecipeResults = async (query) => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (arr) {
    recipeView.renderError();
  }
};

export const getResultsPage = (pageNumber = state.search.page) => {
  state.search.page = pageNumber;
  const start = (pageNumber - 1) * state.search.resPerPage;
  const end = pageNumber * state.search.resPerPage;

  return state.search.results.slice(start, end);
};
