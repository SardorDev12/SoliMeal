class SearchResultsView {
  #parentElement = document.querySelector(".recipes-list");
  #data;
  #errorMessage = "No recipe found on this url! Please, try another one!";
  #successMessage = "Recipe found successfully!";

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#parentElement.innerHTML = markup;
  }

  #generateMarkup() {
    return this.#data
      .map((data) => {
        return `
              <a href="${data.id}">
              <li class="recipes-item">
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
  loadingMessage = () => {
    const markup = `<h3 class="loading">Loading...</h3>`;
    this.#parentElement.innerHTML = markup;
  };

  renderError(message = this.#errorMessage) {
    const markup = `
       <div class="error">
      <div class="error-icon">
       <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
      </div>
      <div class="error-text">
        <p>${message}</p>
      </div>
    </div>
    `;

    this.#parentElement.innerHTML = markup;
  }

  renderSuccess(message = this.#successMessage) {
    const markup = `
       <div class="success">
      <div class="success-icon">
       <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="success-text">
        <p>${message}</p>
      </div>
    </div>
    `;

    this.#parentElement.innerHTML = markup;
  }
}

export default new SearchResultsView();
