let prods = []; // store the response from the API

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

getProducts();

function buildCard(product) {
  // Hard coding the brands
  const brands = ["Apple inc.", "Xiaomi inc.", "Google LLC", "Outfitters", "Faberge", "Versace", "Gucci", "Ferrero Rochet"];
  // select one of the brands randomly
  let brand = brands[Math.floor(Math.random() * 8)];
  // calculate the discount upto 100.
  let discount = Math.floor(Math.random() * 100);
  // if the discount is less than 30. don't show DISCOUNT TAG.
  let showDiscount = discount > 30 ? `<div class="disc-tag">${"-" + discount + "%"}</div>` : "";

  // HTML code for the CARD to be appended into the container.
  let html = `<div class="card">\n
    ${showDiscount}\n
    <div class="left">\n
      <div class="img-container">\n
        <img src="${product.image}" alt="product image">\n
      </div>\n
      <div class="txt-container">\n
        <p class="heading">${product.title}</p>\n
        <p class="brand">${brand}</p>\n
        <p class="price">${"$ " + product.price}</p>\n
        <button class="button-solid" type="button">More Info</button>\n
      </div>\n
    </div>\n
  </div>\n`;

  // get the card container
  $("#products-container").append(html);
}

function clearContent(element) {
  // Clear the content of "products-container"
  $("#products-container").empty();

  // Remove the "active-filter" class from all elements with class "category"
  $("#categories .category").removeClass("active-filter");

  // Add the "active-filter" class to the clicked element
  $(`#${element}`).addClass("active-filter");

  if (element == "default") {
    $("#container-title").text("All products");
  } else {
    $("#container-title").text(element);
  }
}

// FILTER(s)
function showDefault() {
  clearContent("default");
  getProducts();
}
function showClothes() {
  clearContent("clothes")
  getProducts("men's clothing");
}

function showJewel() {
  clearContent("jewel")
  getProducts("jewelery");
}

function showTech() {
  clearContent("tech");
  getProducts("electronics");
}
