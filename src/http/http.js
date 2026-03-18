// const fetch = require("node-fetch");

// const url =
//   "https://api.freeapi.app/api/v1/public/randomproducts/product/random";
// const options = { method: "GET", headers: { accept: "application/json" } };

// try {
//   const response = await fetch(url, options);
//   const data = await response.json();
//   console.log(data);
// } catch (error) {
//   console.error(error);
// }

// `https://dummyjson.com/products/category/smartphones`

export async function fetchRandomProducts(limit) {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=&limit=${limit}`,
  );

  if (!response.ok) {
    const error = new Error("Ops! something went wrong, Pls try again!");
    return error;
  }

  const data = await response.json();
  return data;
}

export async function fetchProductsByCategories(category, limit) {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}`,
  );

  if (!response.ok) {
    const error = new Error(
      "Ops! something went wrong can't find products regarding this category, Pls try again!",
    );
    return error;
  }

  const data = await response.json();
  return data;
}

export async function fetchCategories() {
  const response = await fetch(`https://dummyjson.com/products/category-list`);

  if (!response.ok) {
    const error = new Error("Something went wrong, Can't fetch categories");
    return error;
  }

  const data = await response.json();
  return data;
}
