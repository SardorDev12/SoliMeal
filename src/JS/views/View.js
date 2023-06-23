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
