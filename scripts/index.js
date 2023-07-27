let prods = []; // store the response from the API
let chosenProducts = [];

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
        <button class="button-solid add-cart" type="button">Add to Cart</button>\n
      </div>\n
    </div>\n
  </div>\n`;

  // get the card container
  $("#products-container").append(html);
}

// FILTER(s)
function showDefault() {
  clearContent("default");
  getProducts();
}
function showMenClothes() {
  clearContent("men-clothes")
  getProducts("men's clothing");
}
function showWomenClothes() {
  clearContent("women-clothes")
  getProducts("women's clothing");
}

function showJewel() {
  clearContent("jewel")
  getProducts("jewelery");
}

function showTech() {
  clearContent("tech");
  getProducts("electronics");
}

function clearContent(element) {
  // Clear the content of "products-container"
  $("#products-container").empty();

  // Remove the "active-filter" class from all elements with class "category"
  $("#categories .category").removeClass("active-filter");

  if (element != "default") {
    // Add the "active-filter" class to the clicked element.
    // IF the filter is NOT default.
    $(`#${element}`).addClass("active-filter");
  }

  // stores the title of the container heading.
  let title = '';
  // change the heading corresponding to the product type
  switch (element) {
    case "men-clothes":
      title = "Men's Clothing";
      break;
    case "women-clothes":
      title = "Women's Clothing";
      break;
    case "jewel":
      title = "Jewelry";
      break;
    case "tech":
      title = "Technology";
      break;
    default:
      title = "All products";
      break;
  }
  // Set the title of the Container Heading
  $("#container-title").text(title);
}

function addCart() {
  // Attach event listener using event delegation to #products-container
  $("#products-container").on("click", ".add-cart", function () {
    // Find the parent card of the button
    const card = $(this).closest(".card");

    let selectedItem = {
      title: "",
      brand: "",
      price: "",
      imgUrl: "",
    };
    // Access elements in div.txt-container
    const txtContainer = card.find(".txt-container");
    selectedItem['title'] = txtContainer.find(".heading").text();
    selectedItem['brand'] = txtContainer.find(".brand").text();
    selectedItem['price'] = txtContainer.find(".price").text();
    selectedItem['imgUrl'] = card.find(".img-container img").attr("src");

    chosenProducts.push(selectedItem);
    console.log(chosenProducts);
  });
}

function showCartProducts() {
  let totalItemCount = chosenProducts.length;
  let totalPrice;

  chosenProducts.forEach((item) => {
    totalPrice += item.price;
    buildCartCard(item);
  });
  $("#total-products").text(totalItemCount);
  $("#total-price").text(totalPrice);
}

function buildCartCard(item) {
  let html = `
  <div class="card">\n
        <img class="prod-img" src="${item.imgUrl}" alt="product image">\n
        <div class="txt-container">\n
          <div class="title">${item.title}</div>\n
          <div class="brand">${item.brand}</div>\n
        </div>\n
        <p class="price">$${item.price}</p>\n
      </div>\n
      <hr>\n`

  $("cart-products-container").append(html);
}

// getProducts(); //! LOADS PRODUCTS. DO NOT REMOVE!
// addCart();

