

removeBtns = document.getElementsByClassName("btn-danger");

for(let n = 0; n < removeBtns.length; n++) {
  let btn = removeBtns[n];
  btn.addEventListener(
    'click',
    (event) => {
      let clickedBtn = event.target;
      clickedBtn.parentElement.parentElement.remove();
      updateCartTotal();
    }
  );
}

function updateCartTotal() {
  let cartItems = document.getElementsByClassName("cart-item");
  let cartTotal = document.getElementById("cart-total-price");

  let actualTotal = 0;
  for(let item of cartItems) {
    let quant = item.getElementsByClassName("cart-item-quant")[0].getAttribute("value");
    let price = parseInt(
        item.getElementsByClassName("cart-item-price")[0].innerText.replace("$","")
      );
    console.log(quant);
    console.log(price);
    actualTotal += price * quant;
  }

  cartTotal.innerText = "$" + actualTotal;
}