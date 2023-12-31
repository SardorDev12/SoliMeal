export default class View {
  _data;

  loadingMessage = () => {
    const markup = `<h3 class="loading">Loading...</h3>`;
    this._parentElement.innerHTML = markup;
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = markup;
  }

  update(data) {
    // data validation
    if (!data || (Array.isArray(data) && data.length === 0))
      // if data is not valid
      return this.renderError();
    // assigning the coming data to the variable being used in generate markup
    this._data = data;

    // final state of the view
    const newMarkup = this._generateMarkup();

    // creating the DOM object from a string markup
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // selecting all the elements of the final state of the view
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    // selecting the old elements
    const oldElements = Array.from(this._parentElement.querySelectorAll("*"));
    // iterating the new elements to compare each node
    newElements.forEach((newEl, i) => {
      // comparing the new element with old elements
      if (!newEl.isEqualNode(oldElements[i]) && newEl.nodeValue != "") {
        // assigning the new elements' values to the old elements
        oldElements[i].innerHTML = newEl.innerHTML;
      }
    });
  }

  renderError(message = this._errorMessage) {
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
    this._parentElement.innerHTML = markup;
  }

  renderSuccess(message = this._successMessage) {
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
    this._parentElement.innerHTML = markup;
  }
}
