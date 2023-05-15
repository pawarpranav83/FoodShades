/* eslint-disable */
// "use strict";

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

const ratingStars = document.querySelectorAll('.ratingBtn');
const ratingImgStars = document.querySelectorAll('.ratingImgStar');
let rating;
let k = 1;
let j;

ratingStars.forEach((ele, i) => {
  ele.addEventListener('mouseenter', function () {
    if (k != 0) {
      for (j = k; j <= Number(ele.dataset.postn); j++) {
        document.querySelector(`.ratingBtn${j}`).src = '/Images/star-fill.svg';
      }
    }
  });
});

ratingStars.forEach((ele, i) => {
  ele.addEventListener('mouseleave', function () {
    if (k != 0) {
      for (j = k; j <= Number(ele.dataset.postn); j++) {
        document.querySelector(`.ratingBtn${j}`).src = '/Images/star.svg';
      }
    }
  });
});

const setRating = async (rating, userId, restaurantId) => {
  try {
    // console.log(window.location.href.split('/').at(-1));
    const res = await fetch('/api/v1/reviews', {
      method: 'POST',
      // credentials: 'same-origin',
      // mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating,
        user: userId,
        restaurant: restaurantId,
        order: window.location.href.split('/').at(-1),
      }),
    });

    const finalRes = await res.json();

    if (finalRes.status === 'success') {
      showAlert('success', 'Thank you for the Feedback!');
    }
  } catch (err) {
    console.error(err);
  }
};

ratingStars.forEach((ele, i) => {
  ele.addEventListener('click', function () {
    if (k != 0) {
      rating = Number(ele.dataset.postn);
      for (k = 1; k <= Number(ele.dataset.postn); k++) {
        document.querySelector(`.ratingBtn${k}`).src = '/Images/star-fill.svg';
      }
      removeFill(k);
      rating = k - 1;
      // console.log(rating);
      k = 0;

      const orderDetailsCont = document.querySelector('.orderDetailsCont');
      const userId = orderDetailsCont.dataset.username;
      const restaurantId = orderDetailsCont.dataset.restaurantid;
      // console.log(rating, userId, restaurantId);
      setRating(rating, userId, restaurantId);
    }
  });
});

const removeFill = function (l) {
  for (; l <= 5; l++) {
    document.querySelector(`.ratingBtn${l}`).src = '/Images/star.svg';
  }
};
