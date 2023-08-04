import View from "./View.js";

class SearchResultsView extends View {
  _parentElement = document.querySelector(".recipes-list");
  _errorMessage = "No recipes found on this query! Please, try another one!";
  _successMessage = "Recipes found successfully!";

  addHandlerShowResults(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const resultsItem = e.target.closest(".recipes-item");
      console.log(resultsItem);
    });
    handler();
  }

  _generateMarkup() {
    return this._data
      .map((data) => {
        return `
              <a href="#${data.id}" class="recipes-item">
              <li>
                <div class="item-img">
                  <img src="${data.image}" />
                </div>
                <div class="item-description">
                  <h3 class="item-title">${data.title}</h3>
                  <p class="item-category">${data.publisher}</p>
                </div>
              </li>
            </a>
          `;
      })
      .join("");
  }
}

export default new SearchResultsView();
