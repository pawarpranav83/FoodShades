/* eslint-disable */

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

const login = async (email, password) => {
  try {
    const res = await fetch('/api/v1/users/login', {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const finalRes = await res.json();
    const restId = finalRes.data.user.restaurant;

    if (finalRes.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign(`/restaurantOwner/${restId}`);
      }, 1000);
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

// console.log(document.querySelector('.form'));
document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const email = document.getElementById('emailtext').value;
  const password = document.getElementById('passwordtext').value;
  // console.log('Hi');

  login(email, password);
});
