let chosenProducts = []; //stores the user selected products

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

// $("#cart-products-container").on("click", ".cart-card #remove-item", function () {
  //   console.log("removing item");
  //   // Find the parent cart card and remove it
  //   const card = $(this).closest(".cart-card");
  //   const txtContainer = card.find(".txt-container");
  //   const title = txtContainer.find(".heading").text();
  
  
  // });
  
//? Function to remove an item from the cart 
$("#cart-products-container").on("click", ".cart-card #remove-item", function () {
  const card = $(this).closest(".cart-card");
  const title = card.find(".title").text();

  // Remove the item from the chosenProducts array
  chosenProducts = chosenProducts.filter((item) => item.title !== title);

  // Remove the cart card from the UI
  card.remove();

  // Update the cart products display
  showCartProducts();
});

$("#Credit-Card").change(function () {
  // Check if the radio button is checked
  if ($(this).is(":checked")) {
    // Display the credit card details div
    $("#card-detail").toggle();
  }
});

$("#Easypaisa").change(function () {
  // Check if the radio button is checked
  if ($(this).is(":checked")) {
    // Display the credit card details div
    $("#easypaisa-num").toggle();
  }
});


gsap.from(".feature-icon", {
  y: 0,
  x: -150,
  scrollTrigger: {
    trigger: ".feature-icon",
    scroller: "html",
    // markers:true,
    start: "right 50%",
    end: "right 50%",
    scrub: 4,
  },
});