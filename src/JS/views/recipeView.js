class Recipeview {
  #parentElement = document.querySelector(".recipes-window");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.generateMarkup();
    this.#parentElement.innerHTML = markup;
  }

  loadingMessage = () => {
    const markup = `<h3 class="loading">Loading...</h3>`;
    this.#parentElement.innerHTML = markup;
  };

  generateMarkup() {
    return `
        <div class="recipe-info">
            <div class="recipe-img">
              <img src="${this.#data.image}" alt="${this.#data.title}" />
              <div class="recipe-meal-title">
                <h2>${this.#data.title}</h2>
              </div>
            </div>
            <div class="recipe-navbar">
              <div class="prep-info">
                <div class="prep-info-time">
                  <i class="fa-regular fa-clock"></i>
                  <h4><span class="recipe-time-value">${
                    this.#data.cooking_time
                  }</span> minutes</h4>
                </div>
                <div class="prep-info-servings">
                  <i class="fa-solid fa-users"></i>
                  <h4><span class="servings-number">${
                    this.#data.servings
                  }</span> servings</h4>
                  <div class="servings-btns">
                    <button type="button">
                      <i class="fa-solid fa-minus dec"></i>
                    </button>
                    <button type="button">
                      <i class="fa-solid fa-plus inc"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="bookmarks-btn">
                <button>
                  <i class="fa-regular fa-bookmark"></i>
                </button>
              </div>
            </div>
            <article class="ingredients-section">
              <h2 class="ingredients-title">Ingredients</h2>
              <ul class="ingredients">
              ${this.#data.ingredients
                .map((ingredient) => {
                  this.generateMarkupIngredients(ingredient);
                })
                .join("")}
                 
              </ul>
            </article>
            <div class="how-to-cook">
              <h2>How to Cook</h2>
              <p>
                This recipe was carefully designed and tested by
                <span class="recipe-publisher">${this.#data.publisher}.
                Check out directions at their website.
              </p>
              <a href="${this.#data.source}" target="_blank">
                <button type="button">directions</button>
              </a>
            </div>
          </div>
`;
  }

  generateMarkupIngredients(ingredient) {
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
export default new Recipeview();
