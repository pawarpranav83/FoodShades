/*eslint-disable*/

let rests = [];

const restaurants = document.querySelectorAll('.restaurantCard');

restaurants.forEach((ele) => {
  const name = ele
    .querySelector('.restaurantCardName')
    .textContent.toLowerCase();
  const element = ele;
  rests.push({ name, element });
});

console.log(rests);

const searchIcon = document.querySelector('.searchIcon');
const searchBarInput = document.querySelector('#searchbar');
const homepageBanner = document.querySelector('.homepageBanner');

searchBarInput.addEventListener('input', (event) => {
  homepageBanner.remove();
  const value = event.target.value.toLowerCase();

  rests.forEach((rest) => {
    const isVisible = rest.name.includes(value);
    rest.element.classList.toggle('hide', !isVisible);
  });
});
