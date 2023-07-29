//? Builds cards for the Cart Section. 
function buildCartCard(item) {
  let html = `
  <div class="cart-card">\n
    <div id="remove-item"><i class="fa-regular fa-trash-can"></i></div>
    <img class="prod-img" src="${item.imgUrl}" alt="product image">\n
    <div class="txt-container">\n
      <div>
        <div class="title">${item.title}</div>\n
        <div class="brand">${item.brand}</div>\n
      </div>
      <div class="quantity">Qty. x ${item.quantity}</div>\n
    </div>\n
    <p class="price">$${item.price.toFixed(2)}</p>\n
  </div>\n
  <hr>\n`;

  // Adds cards into the Cards container.
  $("#cart-products-container").append(html);
}