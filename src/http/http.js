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

export async function fetchRandomProducts(limit, skip, signal) {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    signal,
  );

  if (!response.ok) {
    const error = new Error("Ops! something went wrong, Pls try again!");
    return error;
  }

  const data = await response.json();
  return data;
}
