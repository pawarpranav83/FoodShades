/* eslint-disable */

// 'use strict';

// import Stripe from 'https://js.stripe.com/v3/';

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class='alert alert--${type}'>${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const removeCartItem = (event) => {
  const buttonClicked = event.target;
  // console.log(
  //   buttonClicked.parentElement.parentElement.parentElement.parentElement
  //     .parentElement
  // );
  buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

  if (!document.querySelector('.item')) {
    const emptyCart = document.createElement('div');
    const emptyCartText = document.createElement('div');
    emptyCart.classList.add('item');
    emptyCart.classList.add('itemEmpty');
    emptyCartText.classList.add('cartEmpty');
    emptyCartText.textContent = `Aren't you starving!`;

    emptyCart.appendChild(emptyCartText);
    document.querySelector('.cart-rows').appendChild(emptyCart);
  }

  updateCartTotal();
};

const updateCartTotal = () => {
  const cartRows = document.querySelectorAll('.cart-row');
  let total = 0;

  cartRows.forEach((ele) => {
    const price = parseFloat(
      ele.querySelector('.price').innerText.replace('₹', '')
    );
    const quantity = Number(ele.querySelector('.cart-quantity-input').value);
    total += price * quantity;
  });

  const priceSummary = document.querySelector('.priceSummary');
  const subTotalText = priceSummary.querySelector('.subtotalPrice');
  const totalText = priceSummary.querySelector('.totalPrice');
  let finalTotal = 0;
  if (total == 0) {
    subTotalText.textContent = '---';
    totalText.textContent = '---';
    finalTotal = 0;
  } else {
    subTotalText.textContent = '₹' + total;
    totalText.textContent = '₹' + (total + 40);
    finalTotal = total + 40;
  }
  // console.log(finalTotal);

  return finalTotal;
};

const quantityChanged = (event) => {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
};

const addItemToCart = (title, price, veg, description) => {
  // const cartRow = document.createElement('div');
  // cartRow.classList.add('item');
  // cartRow.classList.add('cart-row');

  const cartRows = document.querySelectorAll('.cart-row');
  const emptyCart = document.querySelector('.itemEmpty');

  for (let i = 0; i < cartRows.length; i++) {
    const cartTitle = cartRows[i].querySelector('.dishName').innerText;
    if (cartTitle == title) {
      showAlert('success', 'This item is already added to the cart');
      return;
    }
  }

  if (emptyCart) {
    emptyCart.remove();
  }

  // console.log(description);

  let html = `
      <div class="item cart-row" data-veg=${veg} data-description='${description}'>
        <img src="/Images/dish1.png" alt="" class="dishImg dish1" />
        <div class="nameCounter">
          <div class="dishName">${title}</div>
          <div class="counter">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">
              <svg class="delete__icon">
                <use xlink:href="/Images/sprite.svg#icon-bin2" />
              </svg>
            </button>
          </div>
        </div>
        <div class="price">₹${price}</div>
      </div>`;

  const cartContainer = document.querySelector('.cart-rows');
  cartContainer.insertAdjacentHTML('beforeend', html);

  const allCartRows = document.querySelectorAll('.cart-row');
  const cartRow = allCartRows[allCartRows.length - 1];

  cartRow
    .querySelector('.btn-danger')
    .addEventListener('click', removeCartItem);
  cartRow
    .querySelector('.cart-quantity-input')
    .addEventListener('change', quantityChanged);

  updateCartTotal();
};

const addToCartClicked = (event) => {
  const button = event.target;
  const title = button.dataset.name;
  const price = button.dataset.price;
  const veg = button.dataset.veg;
  const description = button.dataset.description;
  // console.log(description);
  addItemToCart(title, price, veg, description);
};

const placeOrder = async () => {
  if (document.querySelector('.cart-row')) {
    const totalPrice = updateCartTotal();

    const cartRows = document.querySelectorAll('.cart-row');
    let dishes = [];
    cartRows.forEach((ele) => {
      dishes.push({
        name: ele.querySelector('.dishName').innerText,
        price: Number(ele.querySelector('.price').innerText.replace('₹', '')),
        veg: Boolean(ele.dataset.veg),
        quantity: Number(ele.querySelector('.cart-quantity-input').value),
        description: ele.dataset.description,
      });
      // console.log(ele.dataset.description);
      ele.remove();
    });

    if (!document.querySelector('.item')) {
      const emptyCart = document.createElement('div');
      const emptyCartText = document.createElement('div');
      emptyCart.classList.add('item');
      emptyCart.classList.add('itemEmpty');
      emptyCartText.classList.add('cartEmpty');
      emptyCartText.textContent = `Aren't you starving!`;

      emptyCart.appendChild(emptyCartText);
      document.querySelector('.cart-rows').appendChild(emptyCart);
    }

    updateCartTotal();

    // console.log(totalPrice);

    const restContainer = document.querySelector('.restContainer');
    const userId = restContainer.dataset.username;
    const restId = restContainer.dataset.restaurantid;
    // console.log(restId);

    const orderId = await processingOrder(totalPrice, dishes, userId, restId);
    // console.log(orderId);
    orderDish(orderId);
  } else {
    showAlert('success', 'No dishes selected!');
  }
};

const ready = () => {
  const removeCartItemButtons = document.querySelectorAll('.btn-danger');
  removeCartItemButtons.forEach((element) => {
    // console.log('Hi');
    element.addEventListener('click', removeCartItem);
  });

  const quantityInputs = document.querySelectorAll('.cart-quantity-input');
  quantityInputs.forEach((element) => {
    element.addEventListener('change', quantityChanged);
  });

  const addToCartButtons = document.querySelectorAll('.addToCart');
  addToCartButtons.forEach((ele) => {
    ele.addEventListener('click', addToCartClicked);
  });

  const placeOrderButton = document.querySelector('.placeOrder');
  placeOrderButton.addEventListener('click', placeOrder);
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

const processingOrder = async (price, dishes, userId, restaurantId) => {
  try {
    const res = await fetch('/api/v1/orders', {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice: price,
        dishes,
        user: userId,
        restaurant: restaurantId,
      }),
    });

    const finalRes = await res.json();
    // console.log(finalRes.data._id);
    const orderId = finalRes.data._id;
    return orderId;

    // if (finalRes.status === 'success') {
    //   showAlert('success', 'Processing...');
    //   window.setTimeout(() => {
    //     location.assign(`/orderPlaced/${orderId}`);
    //   }, 1000);
    // }
  } catch (err) {
    console.error(err.response.data);
  }
};

const stripe = Stripe(
  'pk_test_51N82EgSBM2O7fXpbAk5qbtqbI5DAdNHZTh7PbbrXiS7NyMFP6zei6Wf7yt6bltng2RHcRluNbkVpbaRfRhaEWpy900vrfleaEI'
);

const orderDish = async (orderId) => {
  try {
    const res = await fetch(`/api/v1/orders/checkout-session/${orderId}`, {
      method: 'GET',
    });

    const finalRes = await res.json();
    // console.log(finalRes.session.id);
    const session = finalRes.session;

    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    // showAlert('Error', err);
  }
};
