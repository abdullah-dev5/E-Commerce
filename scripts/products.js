async function getProducts(category) {
  let URL = '';
  if (category != null) {
    // if the user applies a filter. use this URL
    URL = `https://fakestoreapi.com/products/category/${category}`
  } else {
    // default URL
    URL = 'https://fakestoreapi.com/products';
  }
  try {
    const res = await fetch(URL);
    if (!res.ok) {
      throw new Error("Network response NOT ok");
    }

    console.log("Response received.");
    // converts the response to JSON format.
    const json = await res.json();

    if (Array.isArray(json)) {
      json.forEach((element) => {
        buildCard(element);
      });
    } else {
      throw new Error("Response is NOT an array");
    }
  } catch (err) {
    console.log("Error fetching products:", err);
  }
}