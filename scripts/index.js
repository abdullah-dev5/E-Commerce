let chosenProducts = []; //stores the user selected products

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

//? Builds the product cards from the API response 
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

//? FILTER(s)
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

//? Utility function. Used to clear the previous response 
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

//? this function is triggered each time a user clicks "Add to cart".
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
    selectedItem['title'] = txtContainer.find(".heading").text(); // Corrected class name from .heading to .title
    selectedItem['brand'] = txtContainer.find(".brand").text();
    selectedItem['price'] = parseFloat(txtContainer.find(".price").text().substring(1)); // Convert price to a number
    selectedItem['imgUrl'] = card.find(".img-container img").attr("src"); // Corrected class name from .img-container img to .prod-img

    chosenProducts.push(selectedItem);
    showCartProducts();
    console.log(chosenProducts);
    // showPopup("Item added successfully")
  });
}

//? this functions loads all the user selected products into the cart. 
function showCartProducts() {
  let totalItemCount = chosenProducts.length;
  let totalPrice = 0;

  // clear the previous result in cart container
  $("#cart-products-container").empty();

  // run a loop for every user selected item.
  chosenProducts.forEach((item) => {
    totalPrice += item.price;
    buildCartCard(item);
  });

  $("#total-products").text(totalItemCount); // display total products in the cart
  $("#total-price").text(`$${totalPrice.toFixed(2)}`); // display sum of total amount of user selected products
}

//? Builds cards for the Cart Section. 
function buildCartCard(item) {
  let html = `
  <div class="cart-card">\n
    <img class="prod-img" src="${item.imgUrl}" alt="product image">\n
    <div class="txt-container">\n
      <div class="title">${item.title}</div>\n
      <div class="brand">${item.brand}</div>\n
    </div>\n
    <p class="price">$${item.price.toFixed(2)}</p>\n
  </div>\n
  <hr>\n`;

  // Adds cards into the Cards container.
  $("#cart-products-container").append(html);
}

function showCart() {
  $("#cart").toggle();
}

function closeCheckout() {
  $("#checkout").toggle();
}

if (chosenProducts.length > 0) {
  $("#toCheckout").removeAttr("disabled");
}

function showPopup(message) {
  let html = `<div class="success-popup">\n
  <div class="popup-message">\n
    <i class="fa-regular fa-circle-check fa-lg"></i>\n
    <p>${message}</p>
  </div>
</div>`

  $("body").append(html).show().delay(100).fadeOut();
}
function showNavigation() {
  // If the navbar is HIDDEN make it visible.
  if ($("#nav-links").css("visibility") == "hidden") {
    $("#nav-links").css("visibility", "visible");
  } 
  // else make it HIDDEN
  else {
    $("#nav-links").css("visibility", "hidden");
  }
}