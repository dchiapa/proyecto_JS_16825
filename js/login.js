const users = new Users();
const lStorage = new Storage();
const form = document.querySelector(".user");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userPassword = form.querySelector("#userPassword");

window.addEventListener("load", () => {
  if (lStorage.storageGetUserSession().length > 0) {
    window.location.href = "./userPage.html";
  }
});

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userName.value !== "" && userPassword.value !== "") {
    const user = users.getUser(userName.value, "login");
    if (user) {
      if (user.userPassword === userPassword.value) {
        const loggedUser = JSON.stringify({
          ...user,
          login: new Date(),
        });
        lStorage.storageSetUserSession(loggedUser);
        alert("Bienvenido");
        window.location.href = "userAdminPage.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  } else alert("Ingrese un usuario y contraseña");
});
