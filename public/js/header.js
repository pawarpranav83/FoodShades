/*eslint-disable*/

let navBarIconHoverHeader = (element, img) => {
  element.addEventListener('mouseenter', function () {
    img.src = `/Images/${img.dataset.name}-fill.svg`;
  });
  element.addEventListener('mouseleave', function () {
    img.src = `/Images/${img.dataset.name}.svg`;
  });
};

const homepagePastOrders = document.querySelector('.homePagePastOrders');
const homepageAccount = document.querySelector('.homepageAccount');
const homepageLogOut = document.querySelector('.homepageLogOut');
const homepageAccountImg = document.querySelector('.homepageAccountImg');
const homepageLogOutImg = document.querySelector('.homepageLogOutImg');
const homepagePastOrdersImg = document.querySelector('.homePagePastOrdersImg');

navBarIconHoverHeader(homepageAccount, homepageAccountImg);
navBarIconHoverHeader(homepageLogOut, homepageLogOutImg);
navBarIconHoverHeader(homepagePastOrders, homepagePastOrdersImg);

let userId;

const currentUser = async () => {
  try {
    const res = await fetch('/api/v1/users/me', {
      method: 'GET',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
    });

    const finalRes = await res.json();
    userId = finalRes.data._id;
    // console.log(res.user._id);
  } catch (err) {
    console.error(err.response.status);
  }
};

currentUser();

homepagePastOrders.addEventListener('click', (event) => {
  location.assign(`/pastOrders/${userId}`);
});

const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout', {
      method: 'GET',
      // credentials: 'same-origin',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json',
      },
    });
    const finalRes = await res.json();
    // console.log(finalRes.status);
    if (finalRes.status === 'success') location.assign('/');
  } catch (err) {
    // alert('Error logging out! Try again.');
    console.log(err);
  }
};

homepageLogOut.addEventListener('click', logout);

homepageAccount.addEventListener('click', () => {
  location.assign('/me');
});