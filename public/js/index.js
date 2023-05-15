/* eslint-disable */

navigator.geolocation.getCurrentPosition(
  (position) => {
    // console.log(position);
  },
  () => {
    alert("Could not get your position");
  }
);
