/* eslint-disable*/

'use strict';

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

const body = document.querySelector('body');
const bodyHeight = getComputedStyle(body).height;
const overlay = document.querySelector('.overlay');
const btnOpenModalAdd = document.querySelector('.addDish');
const btnOpenModalEdit = document.querySelectorAll('.editDish');
const btnCloseModal = document.querySelector('.modalClosebtn');
const modal = document.querySelector('.modalWindowEditRest');
const submitBtn = document.querySelector('.dishEditSubmitBtn');
const restaurantId = window.location.href.split('/').at(-1);
let currentDishId;
overlay.style.height = bodyHeight;
// console.log(btnOpenModalEdit);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  modal.querySelector('#nameDish').value = null;
  modal.querySelector('#priceDish').value = null;
  modal.querySelector('#vegDishBoolInput').value = null;
  modal.querySelector('#descriptionDish').value = null;
  currentDishId = null;
};

const editDish = (event) => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  modal.dataset.operation = 'edit';

  const dishCont = event.target.parentElement.parentElement;
  const name = dishCont.querySelector('.dishDisplayNameRest').textContent;
  const price = dishCont
    .querySelector('.dishDisplayPriceRest')
    .textContent.replace('₹', '');
  const description = dishCont.querySelector(
    '.dishDescriptionRest'
  ).textContent;
  const veg = dishCont.querySelector('.veg').dataset.veg;
  // console.log(veg, 'hi', dishCont.querySelector('.veg'));

  modal.querySelector('#nameDish').value = name;
  modal.querySelector('#priceDish').value = price;
  modal.querySelector('#vegDishBoolInput').value = veg;
  modal.querySelector('#descriptionDish').value = description;
  currentDishId = event.target.parentElement.parentElement.dataset.dishid;
  // console.log(currentDishId);
};

const updateDishRequest = async (dishes, operation) => {
  try {
    const res = await fetch(`/api/v1/restaurants/${restaurantId}`, {
      method: 'PATCH',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dishes,
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes.data);

    if (finalRes.status === 'success') {
      showAlert('success', `Dish ${operation}!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.error(err);
  }
};

const getDishes = async () => {
  try {
    const res = await fetch(`/api/v1/restaurants/${restaurantId}`, {
      method: 'GET',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
    });

    const finalRes = await res.json();
    return finalRes.data.dishes;
  } catch (err) {
    console.error(err);
  }
};

const updateDish = async () => {
  let dishes = await getDishes();
  // console.log(dishes);
  // console.log(dishes);

  const name = modal.querySelector('#nameDish').value;
  const price = Number(modal.querySelector('#priceDish').value);
  const veg =
    modal.querySelector('#vegDishBoolInput').value === 'true' ? true : false;
  const description = modal.querySelector('#descriptionDish').value;
  const dish = { name, price, veg, description };
  // console.log(dishes[0]._id, currentDishId);

  if (modal.dataset.operation === 'edit') {
    dishes[
      dishes.findIndex((element) => String(element._id) === currentDishId)
    ] = dish;

    dishes = dishes.map((element, index) => {
      // console.log(index);
      delete element._id;
      return element;
    });

    updateDishRequest(dishes, 'Updated');
  } else if (modal.dataset.operation === 'add') {
    dishes = dishes.map((element, index) => {
      delete element._id;
      return element;
    });

    dishes.push(dish);
    // console.log(dishes);

    updateDishRequest(dishes, 'Added');
  }

  // console.log(dishes);
};

const addDish = (event) => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  modal.dataset.operation = 'add';
};

btnOpenModalAdd.addEventListener('click', addDish);
btnOpenModalEdit.forEach((ele) => ele.addEventListener('click', editDish));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

submitBtn.addEventListener('click', updateDish);
