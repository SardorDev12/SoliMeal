// const showRecipe = async () => {
//   try {
//     const res = await fetch(
//       "https://forkify-api.herokuapp.com/api/get?rId=47746"
//     );

//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);

//     const { recipe } = data;
//     console.log(recipe);
//   } catch (error) {
//     alert(error);
//   }
// };
// showRecipe();

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

// Servings counter
const servingsBtns = document.querySelectorAll(".servings-btns button");
let servingsNumberEl = document.querySelector(".servings-number");

let servingsNumber = parseInt(
  document.querySelector(".servings-number").innerText
);

servingsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.classList.contains("inc") && servingsNumber >= 0) {
      servingsNumber++;
      servingsNumberEl.innerText = servingsNumber;
    } else if (e.target.classList.contains("dec") && servingsNumber > 0) {
      servingsNumber--;
      servingsNumberEl.innerText = servingsNumber;
    }
  });
});
