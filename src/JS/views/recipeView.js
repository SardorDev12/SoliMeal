import View from "./View.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipes-window");
  _errorMessage = "No recipe found on this url! Please, try another one!";
  _successMessage = "Recipe found successfully!";

  _generateMarkup() {
    return `
        <div class="recipe-info">
            <div class="recipe-img">
            <img src="${this._data.image}" alt="${this._data.title}" />
            <div class="recipe-meal-title">
                <h2>${this._data.title}</h2>
              </div>
            </div>
            <div class="recipe-navbar">
              <div class="prep-info">
                <div class="prep-info-time">
                  <i class="fa-regular fa-clock"></i>
                  <h4><span class="recipe-time-value">${
                    this._data.cooking_time
                  }</span> minutes</h4>
                </div>
                <div class="prep-info-servings">
                  <i class="fa-solid fa-users"></i>
                  <h4><span class="servings-number">${
                    this._data.servings
                  }</span> servings</h4>
                  <div class="servings-btns">
                    <button class="servings-btn" data-updateTo="${
                      this._data.servings - 1
                    }" type="button">
                      <i class="fa-solid fa-minus dec"></i>
                    </button>
                    <button class="servings-btn" data-updateTo="${
                      this._data.servings + 1
                    }" type="button">
                      <i class="fa-solid fa-plus inc"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="bookmarks-btn ${
                this._data.bookmarked ? "marked" : ""
              }">
                <button>
                    <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <article class="ingredients-section">
              <h2 class="ingredients-title">Ingredients</h2>
              <ul class="ingredients">
              ${this._data.ingredients
                .map(this._generateMarkupIngredients)
                .join("")}
              </ul>
            </article>
            <div class="how-to-cook">
              <h2>How to Cook</h2>
              <p>
                This recipe was carefully designed and tested by
                <span class="recipe-publisher">${this._data.publisher}.
                Check out directions at their website.
              </p>
              <a href="${this._data.source}" target="_blank">
                <button type="button">directions</button>
              </a>
            </div>
          </div>
`;
  }

  addHandlerRender(handler) {
    const events = ["hashchange", "load"];
    events.forEach((event) => {
      window.addEventListener(event, handler);
    });
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".servings-btn");
      if (!btn) return;

      const newServings = +btn.dataset.updateto;
      if (newServings > 0) handler(newServings);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const bookmarkBtn = e.target.closest(".bookmarks-btn");
      if (!bookmarkBtn) return;
      if (this._data.bookmarked) {
        bookmarkBtn.classList.add("marked");
      }
      handler();
    });
  }

  _generateMarkupIngredients(ingredient) {
    return `<li class="ingredient">
           
            <div class="ingredient-description">
             <span class="ingredient-quantity">${
               ingredient.quantity ? ingredient.quantity : ""
             }</span>
              <span class="ingredient-unit">${ingredient.unit}</span>
            ${ingredient.description}
              </div>
          </li>`;
  }
}
export default new RecipeView();
