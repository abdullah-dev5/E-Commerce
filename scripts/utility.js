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

function showCart() {
  $("#cart").toggle();
}

function closeCheckout() {
  $("#checkout").toggle();
}