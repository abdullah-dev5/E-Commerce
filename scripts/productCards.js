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