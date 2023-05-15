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

const updateSettings = async (name, email, address, type) => {
  try {
    const res = await fetch('/api/v1/users/updateMe', {
      method: 'PATCH',
      // credentials: 'same-origin',
      headers: {
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        location: {
          address,
        },
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    if (finalRes.status === 'success') {
      showAlert(
        'success',
        `${type[0].toUpperCase()}${type.slice(1)} updated successfully!`
      );
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

const updatePassword = async (
  passwordCurrent,
  newPassword,
  newPasswordConfirm,
  type
) => {
  try {
    const res = await fetch('/api/v1/users/updatePassword', {
      method: 'PATCH',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordCurrent,
        newPassword,
        newPasswordConfirm,
      }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    if (finalRes.status === 'success') {
      showAlert(
        'success',
        `${type[0].toUpperCase()}${type.slice(1)} updated successfully!`
      );
    }
  } catch (err) {
    console.error(err.response.data);
  }
};

const userDataForm = document.querySelector('.accountDetailsDisplay');
const userDataUpdateBtn = document.querySelector('.updateData');
const userPasswordForm = document.querySelector('.accountChangePassword');
const userPasswordUpdateBtn = document.querySelector('.updatePassword');

userDataUpdateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.querySelector('#accountEmailId').value;
  const name = document.querySelector('#accountNameId').value;
  const address = document.querySelector('#accountAddressId').value;
  console.log(email, name);

  updateSettings(name, email, address, 'data');
});

userPasswordUpdateBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const passwordCurrent = document.getElementById('oldPasswordInput').value;
  const newPassword = document.getElementById('newPasswordInput').value;
  const newPasswordConfirm = document.getElementById(
    'newPasswordConfirmInput'
  ).value;

  await updatePassword(
    passwordCurrent,
    newPassword,
    newPasswordConfirm,
    'password'
  );

  document.getElementById('oldPasswordInput').value = '';
  document.getElementById('newPasswordInput').value = '';
  document.getElementById('newPasswordConfirmInput').value = '';
});
