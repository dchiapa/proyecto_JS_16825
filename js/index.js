$(document).ready(animateImg());

function animateImg(i) {
  for (let index = 0; index < 5; index++) {
    $("#profile__img").fadeOut().fadeIn(2000);
  }
}
