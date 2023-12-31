import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultsView from "./views/searchResultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

// Load search results
const controlSearchResults = async () => {
  try {
    // Search query from input value
    model.state.search.query = searchView.getQuery();
    const query = model.state.search.query;

    if (!query) return;

    // Loading
    searchResultsView.loadingMessage();
    // Loading recipes with the given query
    await model.loadRecipeResults(query);

    // Rendering the recipes in results section
    searchResultsView.render(model.getResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    searchResultsView.renderError();
  }
};

// Pagination controller
const controlPagination = (gotoPage) => {
  searchResultsView.render(model.getResultsPage(gotoPage));
  paginationView.render(model.state.search);
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

const controlServings = (newServings) => {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

// control bookmarks
const controlBookmarks = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  console.log(model.state.bookmarks);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlStorageBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploads = (newRecipe) => {
  model.uploadRecipe(newRecipe);
};

// Init function to call controllers
const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerClick(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerBookmarks(controlStorageBookmarks);
};
init();

// mark selected recipe
window.addEventListener("click", (e) => {
  const el = e.target.closest(".recipes-item");
  const results = document.querySelectorAll(".recipes-item");
  if (!el) return;
  model.state.search.results.forEach((element, i) => {
    if (element.id == model.state.recipe.id) {
      results.forEach((res) => {
        res?.classList.remove("active");
      });

      el.classList.add("active");
    }
  });
});

// ********** Logo click -> page reload ***********
document.querySelector(".logo").addEventListener("click", () => {
  location.reload();
});

// ********** Bookmarks toggle ***********
document.querySelector(".bookmarks").addEventListener("click", () => {
  document.querySelector(".bookmarks-content").classList.toggle("show");
});

// ************ Show input results on mobile **************
window.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("search-input") ||
    e.target.classList.contains("search-btn")
  ) {
    document.querySelector(".recipes-result").classList.add("show-results");
  } else {
    document.querySelectorAll(".recipes-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelector(".recipes-result")
          .classList.remove("show-results");
      });
    });
  }
});

window.addEventListener("hashchange", () => {
  document.querySelector(".recipes-result").classList.remove("show-results");
});
