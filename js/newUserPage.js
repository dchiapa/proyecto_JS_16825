const users = new Users();
const form = document.querySelector(".user");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userEmail = form.querySelector("#userEmail");
const userPassword = form.querySelector("#userPassword");
const userImage = form.querySelector("#userImage");

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    userName.value !== "" &&
    userEmail.value !== "" &&
    userPassword.value !== ""
  ) {
    users.createUser(
      userName.value,
      userEmail.value,
      userPassword.value,
      userImage.value
    );
    limpiarInputs();
  } else {
    alert("Hay campos obligatorios vacíos");
  }
});

const limpiarInputs = () => {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  userImage.value = "";
};
