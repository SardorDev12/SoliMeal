import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultsView from "./views/searchResultsView.js";

// Load search results
const controlSearchResults = async () => {
  try {
    // Loading
    searchResultsView.loadingMessage();

    // Search query from input value
    const query = searchView.getQuery();
    if (!query) return;

    // Loading recipes with the given query
    await model.loadRecipeResults(query);

    // Rendering the recipes in results section
    searchResultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    searchResultsView.renderError();
  }
};

// Load recipes
const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Loading
    recipeView.loadingMessage();

    // Loading data and storing it to Model.state
    await model.loadRecipe(id);

    // Render data
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

// Init function to call controllers
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// ********** Logo click -> page reload ***********
document.querySelector(".logo").addEventListener("click", () => {
  location.reload();
});

// ********** Bookmarks toggle ***********
document.querySelector(".bookmarks").addEventListener("click", () => {
  document.querySelector(".bookmarks-content").classList.toggle("show");
});

// *********** Modal **********
const addRecipeForm = document.querySelector(".add-recipe-form");
const bgEffect = document.querySelector(".bg-effect");
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-recipe-btn")) {
    addRecipeForm.classList.add("show");
    bgEffect.classList.add("show");
  } else if (e.target.classList.contains("close-btn")) {
    addRecipeForm.classList.remove("show");
    bgEffect.classList.remove("show");
  }
});

// ***************** Servings counter ******************

// ************ Show input results **************
window.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("search-input") ||
    e.target.classList.contains("search-btn")
  ) {
    document.querySelector(".recipes-result").classList.add("show-results");
  } else if (
    document
      .querySelector(".recipes-result")
      .classList.contains("show-results") &&
    !e.target.classList.contains("search-input")
  ) {
    document.querySelector(".recipes-result").classList.remove("show-results");
  }
});
