/*eslint-disable*/

let navBarIconHoverHeader = (element, img) => {
  element.addEventListener('mouseenter', function () {
    img.src = `/Images/${img.dataset.name}-fill.svg`;
  });
  element.addEventListener('mouseleave', function () {
    img.src = `/Images/${img.dataset.name}.svg`;
  });
};

const homepageLogOut = document.querySelector('.homepageLogOut');
const homepageLogOutImg = document.querySelector('.homepageLogOutImg');

navBarIconHoverHeader(homepageLogOut, homepageLogOutImg);

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
