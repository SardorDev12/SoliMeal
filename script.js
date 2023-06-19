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
  result.addEventListener("click", () => {
    console.log("result");
  });
});

// *************** Fetch data ************
const recipesWindow = document.querySelector(".recipes-window");

// ****** Loading *****

const loadingMessage = (parentEl) => {
  const markup = `<h3 class="loading">Loading...</h3>`;
  parentEl.innerHTML = markup;
};

const showRecipe = async () => {
  try {
    loadingMessage(recipesWindow);
    const res = await fetch(
      // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604691c37cdc054bd034"
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd86"
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      source: recipe.source_url,
    };

    // ********* Render data **********

    const markup = `
        <div class="recipe-info">
            <div class="recipe-img">
              <img src="${recipe.image}" alt="${recipe.title}" />
              <div class="recipe-meal-title">
                <h2>${recipe.title}</h2>
              </div>
            </div>
            <div class="recipe-navbar">
              <div class="prep-info">
                <div class="prep-info-time">
                  <i class="fa-regular fa-clock"></i>
                  <h4><span class="recipe-time-value">${
                    recipe.cooking_time
                  }</span> minutes</h4>
                </div>
                <div class="prep-info-servings">
                  <i class="fa-solid fa-users"></i>
                  <h4><span class="servings-number">${
                    recipe.servings
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
              ${recipe.ingredients
                .map((ingredient) => {
                  return `<li class="ingredient">
           
            <div class="ingredient-description">
             <span class="ingredient-quantity">${ingredient.quantity}</span>
              <span class="ingredient-unit">${ingredient.unit}</span>
            ${ingredient.description}
              </div>
          </li>`;
                })
                .join("")}
                
              </ul>
            </article>
            <div class="how-to-cook">
              <h2>How to Cook</h2>
              <p>
                This recipe was carefully designed and tested by
                <span class="recipe-publisher">${recipe.publisher}.
                Check out directions at their website.
              </p>
              <a href="${recipe.source}" target="_blank">
                <button type="button">directions</button>
              </a>
            </div>
          </div>
`;

    recipesWindow.innerHTML = markup;
  } catch (error) {
    alert(error);
  }
};
showRecipe();
