/*eslint-disable*/

'use strict';

navigator.geolocation.getCurrentPosition(
  async (position) => {
    console.log(position);

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const city = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
      .then((res) => res.json())
      .then((res) => {
        const cty = res.city;
        return cty;
      });

    const res = await fetch('/api/v1/users/updateMe', {
      method: 'PATCH',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: {
          coordinates: [position.coords.latitude, position.coords.longitude],
          city,
        },
      }),
    });

    document.querySelector('.address').innerText = city;

    // console.log(await res.json());
  },
  () => {
    alert('Could not get your position');
  }
);

const slides = document.querySelectorAll('.banner');
const btnLeft = document.querySelector('.leftBanner');
const btnRight = document.querySelector('.rightBanner');
const dotContainer = document.querySelector('.dots');
const btnArrowLeft = document.querySelector('.btnArrowLeft');
const btnArrowRight = document.querySelector('.btnArrowRight');

// const slider = function () {
// }
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  goToSlide(0);
  //   createDots();

  //   activateDot(0);
};

init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

const hoverAnimation = function (element) {
  element.style.backgroundColor = 'white';
};

const counterHoverAnimation = function (element) {
  element.style.backgroundColor = 'black';
};

btnLeft.addEventListener('mouseenter', function () {
  hoverAnimation(this);
  btnArrowLeft.src = 'Images/Arrow2.png';
});

btnLeft.addEventListener('mouseleave', function () {
  counterHoverAnimation(this);
  btnArrowLeft.src = 'Images/Arrow.png';
});
btnRight.addEventListener('mouseenter', function () {
  hoverAnimation(this);
  btnArrowRight.src = 'Images/Arrow2.png';
});

btnRight.addEventListener('mouseleave', function () {
  counterHoverAnimation(this);
  btnArrowRight.src = 'Images/Arrow.png';
});

const sortingOptionsIndv = document.querySelectorAll('.sortingOptionsIndv');
const homepageAll = document.querySelector('.homepageAll');
const homepageTime = document.querySelector('.homepageTime');
const homepageRating = document.querySelector('.homepageRating');
const homepageVegOnly = document.querySelector('.homepageVegOnly');
const homepageCategory = document.querySelector('.homepageCategory');

const sortBarOptions = document.querySelector('.sortBarOptions');
const query = JSON.parse(sortBarOptions.dataset.query);
// console.log(query, query.sort, query.onlyVeg, query.foodTypes);
if (query.sort === 'deliveryTime') {
  homepageAll.classList.remove('activeSortingOption');
  homepageTime.classList.add('activeSortingOption');
} else if (query.sort === '-ratingsAverage') {
  homepageAll.classList.remove('activeSortingOption');
  homepageRating.classList.add('activeSortingOption');
} else if (query.onlyVeg) {
  homepageAll.classList.remove('activeSortingOption');
  homepageVegOnly.classList.add('activeSortingOption');
} else if (query.foodTypes) {
  homepageAll.classList.remove('activeSortingOption');
  homepageCategory.classList.add('activeSortingOption');
}

// sortingOptionsIndv.forEach((element) => {
//   element.addEventListener('click', (event) => {
//     const currentActive = sortingOptionsIndv.querySelector(
//       '.activeSortingOption'
//     );
//     if (currentActive) currentActive.classList.remove('.activeSortingOption');

//     event.target.classList.add('.activeSortingOption');
//   });
// });
