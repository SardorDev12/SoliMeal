import View from "./View.js";

class addRecipeView extends View {
  _parentElement = document.querySelector(".add-form");

  _window = document.querySelector(".add-recipe-form");
  _overlay = document.querySelector(".bg-effect");
  _btnOpen = document.querySelector(".add-recipe-btn");
  _btnClose = document.querySelector(".close-btn");

  constructor() {
    super();
    this.addHandlerShowAddRecipe();
    this.addHandlerHideAddRecipe();
  }

  toggleWindow() {
    this._window.classList.toggle("show");
    this._overlay.classList.toggle("show");
  }

  addHandlerShowAddRecipe() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerHideAddRecipe() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
