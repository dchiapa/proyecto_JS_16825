const users = new Users();
const form = document.querySelector(".user");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userEmail = form.querySelector("#userEmail");
const userPassword = form.querySelector("#userPassword");
const userImage = form.querySelector("#userImage");

const pageLoad = () => {};
formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  users.updateUser(
    userName.value,
    userEmail.value,
    userPassword.value,
    userImage.value
  );
  limpiarInputs();
});

const limpiarInputs = () => {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  userImage.value = "";
};
