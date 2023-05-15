/*eslint-disable*/

let dishes = [];

const dishesCont = document.querySelectorAll('.dishDisplay');

dishesCont.forEach((ele) => {
  const name = ele.querySelector('.dishDisplayName').textContent.toLowerCase();
  const element = ele;
  dishes.push({ name, element });
});

console.log(dishes);

const searchIcon = document.querySelector('.searchIcon');
const searchBarInput = document.querySelector('#searchbar');

searchBarInput.addEventListener('input', (event) => {
  const value = event.target.value.toLowerCase();

  dishes.forEach((dish) => {
    const isVisible = dish.name.includes(value);
    dish.element.classList.toggle('hide', !isVisible);
  });
});
