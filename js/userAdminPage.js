const users = new Users();
const lStorage = new Storage();
const form = document.querySelector(".user");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userEmail = form.querySelector("#userEmail");
const userPassword = form.querySelector("#userPassword");
const userImage = form.querySelector("#userImage");
const subtitles = document.querySelectorAll(".content__subtitle");
let userLinks = [];

const limpiarInputs = () => {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  userImage.value = "";
};

const createLinks = (user) => {
  userLinks = user.userLinks;
  if (userLinks.length > 0) {
    for (userLink of userLinks) {
      const item = document.createElement("li");
      item.classList.add("user__item");
      const linkDescription = document.createElement("input");
      linkDescription.classList.add("user__linkDescription");
      linkDescription.value = userLink.linkDescription;
      item.appendChild(linkDescription);
      const linkUrl = document.createElement("input");
      linkUrl.classList.add("user__linkUrl");
      linkUrl.value = userLink.linkUrl;
      item.appendChild(linkUrl);
      const btnUpdate = document.createElement("button");
      btnUpdate.classList.add("user__btn");
      btnUpdate.classList.add("user__btn--update");
      btnUpdate.innerHTML = "Actualizar";
      btnUpdate.setAttribute("data-target", userLink.name);
      item.appendChild(btnUpdate);
      const btnDelete = document.createElement("button");
      btnDelete.classList.add("user__btn");
      btnDelete.classList.add("user__btn--delete");
      btnDelete.innerHTML = "Eliminar";
      btnDelete.setAttribute("data-target", userLink.name);
      item.appendChild(btnDelete);
      document.querySelector(".links").appendChild(item);
    }
  }
  const item = document.createElement("li");
  item.classList.add("user__item");
  const linkLabelDescription = document.createElement("label");
  linkLabelDescription.classList.add("user__linkLabel");
  linkLabelDescription.innerHTML = "Descripción:";
  item.appendChild(linkLabelDescription);
  const linkDescription = document.createElement("input");
  linkDescription.classList.add("user__linkDescription");
  item.appendChild(linkDescription);
  const linkLabelUrl = document.createElement("label");
  linkLabelUrl.classList.add("user__linkLabel");
  linkLabelUrl.innerHTML = "Url:";
  item.appendChild(linkLabelUrl);
  const linkUrl = document.createElement("input");
  linkUrl.classList.add("user__linkUrl");
  item.appendChild(linkUrl);
  const btn = document.createElement("button");
  btn.classList.add("user__btn");
  btn.classList.add("user__btn--create");
  btn.innerHTML = "Agregar";
  btn.setAttribute("data-target", userName.value);
  item.appendChild(btn);
  document.querySelector(".links").appendChild(item);
  createListeners(user);
};

const createListeners = (user) => {
  const buttons = document.querySelectorAll(".user__btn");
  for (button of buttons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (button.classList.contains("user__btn--create")) {
        const inputValues = getInputsValues();
        console.log(inputValues);
        if (inputValues !== undefined) {
          users.updateUser(
            user.userName,
            user.userEmail,
            user.userPassword,
            user.userImage,
            user.userLinks
          );
          alert("Link agregado");
        } else {
          alert("Ingrese una descripción y una url");
        }
        console.log(users.getUser(user.userName, "login"));
      } else if (button.classList.contains("user__btn--update")) {
        console.log("Actualizar");
      } else if (button.classList.contains("user__btn--update")) {
        console.log("Eliminar");
      }
    });
  }
};

const getInputsValues = () => {
  const inputDescription = document.querySelector(
    ".user__linkDescription"
  ).value;
  const inputUrl = document.querySelector(".user__linkUrl").value;
  if (inputDescription !== "" && inputUrl !== "") {
    return { Description: inputDescription, url: inputUrl };
  } else return;
};
const pageLoad = () => {
  user = lStorage.storageGetUserSession();
  if (user.userName === undefined) {
    window.location.href = "index.html";
  } else {
    userName.value = user.userName;
    userEmail.value = user.userEmail;
    userImage.value = user.userImage;
    userLinks = user.userLinks;
    createLinks(user);
  }
  setTimeout(() => {
    lStorage.storageEndUserSession();
    window.location.href = "index.html";
  }, 1800000);
};

window.addEventListener("load", pageLoad());

formBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (userEmail.value === "") {
    alert("Rellenar los campos obligatorios");
  } else {
    if (userPassword.value === "") {
      userPassword.value = user.userPassword;
    }
    if (userImage.value === "") {
      userImage.value = user.userImage;
    }
    user.userEmail = userEmail.value;
    user.userPassword = userPassword.value;
    user.userImage = userImage.value;
    const actualizado = users.updateUser(
      userName.value,
      userEmail.value,
      userPassword.value,
      userImage.value
    );
    if (actualizado === "Actualizado") {
      alert(`Usuario ${userName.value} actualizado`);
      lStorage.storageEndUserSession();
      window.location.href = "index.html";
      limpiarInputs();
    } else if (actualizado === "Iguales") {
      alert(`No hay datos que actualizar`);
    }
  }
});

subtitles.forEach((subtitle) => {
  subtitle.addEventListener("click", function () {
    const id = subtitle.id;
    const section = document.querySelector(`.${id}`);
    section.classList.toggle("hide");
  });
});
