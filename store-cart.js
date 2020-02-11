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
      removeItem
    );
  }
}

function buyCart(){
  console.log("Comprar carro");
}

function addCartItem(event){
  let cartItems = document.getElementsByClassName("cart-item");
  let itemAdd = event.target.parentElement.parentElement;
  let itemAddName = itemAdd.children[0].innerText;

  let duplicatedItem = false;
  for(let item of cartItems){
    let itemName = item.children[0].children[1].innerText;
    if(itemName == itemAddName) {
      window.alert("The item is already on the cart")
      duplicatedItem = true;
    }
  }
  if(!duplicatedItem){
    newCartItem(itemAdd, itemAddName);
    updateCartTotal();
  }
}

function newCartItem(itemAdd, itemAddName) {
  let itemRow = document.createElement("tr");
  itemRow.classList.add("cart-item");
  let itemAddImg = itemAdd.children[1].getAttribute("src");
  let itemAddPrice = itemAdd.children[2].children[0].innerText;
  let cartItemInfo =
      `<td class="cart-item-info">
          <img class="cart-item-img" src="${itemAddImg}"
                alt="${itemAddName}" width="100" height="100" />
          <span class="cart-item-title">${itemAddName}</span>
        </td>
        <td class="cart-item-price">${itemAddPrice}</td>
        <td><input type="number" class="cart-item-quant" name="agregar_cantidad" value="1" min="0"></td>
        <td><button class="btn btn-danger">Remover</button></td>`;
  itemRow.innerHTML = cartItemInfo;
  let cartTable = document.querySelector(".cart-table tbody");
  cartTable.appendChild(itemRow);
  itemRow.getElementsByClassName("cart-item-quant")[0].addEventListener(
      'change',
      updateCartTotal
    );
  itemRow.getElementsByClassName("btn-danger")[0].addEventListener(
      'click',
      removeItem
    );
}

const removeItem = (event) => {
        let clickedBtn = event.target;
        clickedBtn.parentElement.parentElement.remove();
        updateCartTotal();
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