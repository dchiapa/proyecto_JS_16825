const users = new Users();
const form = document.querySelector(".user");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userPassword = form.querySelector("#userPassword");

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value !== "" && userPassword.value !== "") {
    const user = users.getUser(userName.value, "login");
    if (user) {
      if (user.userPassword === userPassword.value) {
        alert("Bienvenido");
      } else {
        alert("Contraseña incorrecta");
      }
    }
  } else alert("Ingrese un usuario y contraseña");
});
