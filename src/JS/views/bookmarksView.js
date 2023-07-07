import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks-content");
  _emptyBookmarksMessage =
    "No recipe found on this url! Please, try another one!";

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

export default new BookmarksView();
