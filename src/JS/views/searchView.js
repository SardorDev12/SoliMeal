import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search-input").value;
    if (query.trim().length < 1) return;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector(".search-input").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
