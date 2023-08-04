import { API_URL, KEY, RES_PER_PAGE } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: {},
    resPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
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

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
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

    state.search.page = 1;
  } catch (arr) {
    recipeView.renderError();
  }
};

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    if (ing.quantity) {
      ing.quantity = Math.ceil(
        (ing.quantity * newServings) / state.recipe.servings
      );
    }
  });
  state.recipe.servings = newServings;
};

export const getResultsPage = (pageNumber = state.search.page) => {
  state.search.page = pageNumber;
  const start = (pageNumber - 1) * state.search.resPerPage;
  const end = pageNumber * state.search.resPerPage;

  return state.search.results.slice(start, end);
};

const saveToLocalStorage = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const getFromLocalStorage = () => {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
getFromLocalStorage();

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe);
  if (recipe.id == state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  saveToLocalStorage();
};

export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  saveToLocalStorage();
};
