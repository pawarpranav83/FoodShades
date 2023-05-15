/* eslint-disable */
// import '@babel/polyfill';
// import axios from 'https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js';
// import axios from 'axios';
// import { showAlert } from './alert';
// console.log('Hi');

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

// const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'https://127.0.0.1:8000/api/v1/users/login',
//       data: {
//         email,
//         password,
//       },
//     });

//     if (res.data.status === 'success') {
//       console.log('Hi');
//       showAlert('Logged in successfully');
//       window.setTimeout(() => {
//         location.assign('/overview');
//       }, 1500);
//     }
//     // console.log(res);
//   } catch (err) {
//     showAlert(err.response.data.message);
//   }
// };

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
    // console.log(finalRes.status);

    if (finalRes.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/overview');
      }, 1500);
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
