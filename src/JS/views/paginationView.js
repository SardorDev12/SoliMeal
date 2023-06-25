import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const gotoPage = +e.target.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );
    //   Page 1 and there are other pages
    if (currentPage === 1 && numberOfPages > 1) {
      return `
            <button data-goto="${
              currentPage + 1
            }" type="button" class="pagination-btn next-btn">Page ${
        currentPage + 1
      }</button>
        `;

      //   This is the last page
    } else if (numberOfPages === currentPage && numberOfPages > 1) {
      return `
            <button data-goto="${
              currentPage - 1
            }" type="button" class="pagination-btn prev-btn">Page ${
        currentPage - 1
      }</button>
        `;

      //   There are more pages
    } else if (numberOfPages > currentPage) {
      return `
            <button data-goto="${
              currentPage - 1
            }" type="button" class="pagination-btn prev-btn">Page ${
        currentPage - 1
      }</button>
             <button data-goto="${
               currentPage + 1
             }" type="button" class="pagination-btn next-btn">Page ${
        currentPage + 1
      }</button>
        `;

      //   There is only Page 1
    } else {
      return "";
    }
  }
}

export default new PaginationView();
