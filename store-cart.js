"use strict";

function init() {
  
  let buyBtn = document.getElementById("buyBtn");
  let addBtns = document.getElementsByClassName("btn-add");
  let itemQuantInputs = document.getElementsByClassName("cart-item-quant");
  let removeBtns = document.getElementsByClassName("btn-danger");

  buyBtn.addEventListener('click', buyCart);

  for(let addBtn of addBtns){
    addBtn.addEventListener(
      'click',
      addCartItem
    );
  }

  for(let quantInput of itemQuantInputs){
    quantInput.addEventListener(
      'change',
      updateCartTotal
    );
  }

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
}

function buyCart(){
  console.log("Comprar carro");
}

function addCartItem(){
  console.log("Added to cart");
}

function updateCartTotal() {
  let cartItems = document.getElementsByClassName("cart-item");
  let cartTotal = document.getElementById("cart-total-price");

  let actualTotal = 0;
  for(let item of cartItems) {
    let quant = item.getElementsByClassName("cart-item-quant")[0].value;
    let price = parseInt(
        item.getElementsByClassName("cart-item-price")[0].innerText.replace("$","")
      );
    console.log(quant);
    console.log(price);
    actualTotal += price * quant;
  }

  cartTotal.innerText = "$" + actualTotal;
}