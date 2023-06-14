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
