//? this function is triggered each time a user clicks "Add to cart".
function addCart() {
  // Attach event listener using event delegation to #products-container
  $("#products-container").on("click", ".add-cart", function () {

    let productFound = false;

    // Find the parent card of the button
    const card = $(this).closest(".card");

    // Access elements in div.txt-container
    const txtContainer = card.find(".txt-container");
    const title = txtContainer.find(".heading").text();

    chosenProducts.forEach((item) => {
      if (item.title == title) {
        item.quantity++;
        productFound = true;
        return;
      }
    });

    // if the product is found. Exit this function.
    if (productFound) {
      showCartProducts();
      return
    };

    console.log("Still Adding Product")
    let selectedItem = {
      title: "",
      brand: "",
      price: "",
      imgUrl: "",
      quantity: 1,
    };

    selectedItem['title'] = txtContainer.find(".heading").text();
    selectedItem['brand'] = txtContainer.find(".brand").text();
    selectedItem['price'] = parseFloat(txtContainer.find(".price").text().substring(1));
    selectedItem['imgUrl'] = card.find(".img-container img").attr("src");
    chosenProducts.push(selectedItem);
    showCartProducts();
    console.log(chosenProducts);
    // showPopup("Item added successfully")
  });
}

//? this functions loads all the user selected products into the cart. 
function showCartProducts() {
  // Set the counter to 0
  let totalItemCount = 0;
  let totalPrice = 0;

  // count the quantity of all the products available in the cart.
  chosenProducts.forEach((item) => {
    totalItemCount += parseInt(item.quantity);
  });

  // clear the previous result in cart container
  $("#cart-products-container").empty();

  // run a loop for every user selected item.
  chosenProducts.forEach((item) => {
    totalPrice += item.price;
    buildCartCard(item);
  });

  $("#total-products").text(totalItemCount); // display total products in the cart
  $("#cart-counter").text(totalItemCount);
  $("#total-price").text(`$${totalPrice.toFixed(2)}`); // display sum of total amount of user selected products
}