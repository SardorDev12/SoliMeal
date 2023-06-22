import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
const servingsBtns = document.querySelectorAll(".servings-btns button");
let servingsNumberEl = document.querySelector(".servings-number");

let servingsNumber = document.querySelector(".servings-number");

servingsNumber = parseInt(servingsNumber?.innerHTML);

servingsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("inc") && servingsNumber >= 1) {
      servingsNumber++;
      servingsNumberEl.innerText = servingsNumber;
    } else if (e.target.classList.contains("dec") && servingsNumber > 1) {
      servingsNumber--;
      servingsNumberEl.innerText = servingsNumber;
    }
  });
});

// ************ Show input results **************

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("search-input")) {
    document.querySelector(".recipes-result").classList.add("show-results");
  } else {
    document.querySelector(".recipes-result").classList.remove("show-results");
  }
});

// ********* Hide input results ************
const results = document.querySelectorAll(".recipes-list li");
results.forEach((result) => {
  result.addEventListener("click", () => {});
});

// *************** Fetch data ************

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // ****** Loading *****
    recipeView.loadingMessage();

    // Loading data and storing it to Model.state
    await model.loadRecipe(id);

    // ********* Render data **********
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

// *********** Hashchange and Load events *******************
const events = ["hashchange", "load"];
events.forEach((event) => {
  window.addEventListener(event, controlRecipes);
});