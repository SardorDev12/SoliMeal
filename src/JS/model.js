export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );

  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);

  const { recipe } = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    cooking_time: recipe.cooking_time,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    source: recipe.source_url,
  };
};
