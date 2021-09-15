const users = new Users();
const lStorage = new Storage();
const form = $(".user");
const formBtn = $(".btn");
const userName = $("#userName");
const userPassword = $("#userPassword");

$("window").on("load", () => {
  if (lStorage.storageGetUserSession().length > 0) {
    window.location.href = "./userPage.html";
  }
});

formBtn.on("click", (e) => {
  e.preventDefault();
  const userNameValue = userName.val();
  const userPasswordValue = userPassword.val();

  if (userNameValue !== "" && userPasswordValue !== "") {
    const user = users.getUser(userNameValue, "login");
    if (user) {
      if (user.userPassword === userPasswordValue) {
        const loggedUser = JSON.stringify({
          ...user,
          login: new Date(),
        });
        lStorage.storageSetUserSession(loggedUser);
        alert("Bienvenido");
        window.location.href = "userAdmin.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  } else alert("Ingrese un usuario y contraseña");
});
