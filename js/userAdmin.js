const users = new Users();
const lStorage = new Storage();
const form = document.querySelector(".user__form");
const formBtn = form.querySelector(".user__btn");
const userName = form.querySelector("#userName");
const userEmail = form.querySelector("#userEmail");
const userPassword = form.querySelector("#userPassword");
const userImage = form.querySelector("#userImage");
userLinks = [];

const createLinks = (user) => {
  userLinks = user.userLinks;
  if (userLinks.length > 0) {
    for (userLink of userLinks) {
      const index = userLinks.indexOf(userLink);
      const item = document.createElement("li");
      item.classList.add("user__item");
      item.setAttribute("data-index", index);
      const labelDescription = document.createElement("label");
      labelDescription.classList.add("link__Label");
      labelDescription.innerHTML = "Descripción:";
      const linkDescription = document.createElement("input");
      linkDescription.classList.add("link__Description");
      linkDescription.value = userLink.link;
      item.appendChild(labelDescription);
      item.appendChild(linkDescription);
      const labelUrl = document.createElement("label");
      labelUrl.classList.add("link__Label");
      labelUrl.innerHTML = "Url:";
      const linkUrl = document.createElement("input");
      linkUrl.classList.add("link__Url");
      linkUrl.value = userLink.url;
      item.appendChild(labelUrl);
      item.appendChild(linkUrl);
      const btnUpdate = document.createElement("button");
      btnUpdate.classList.add("btn");
      btnUpdate.classList.add("link__btn--update");
      btnUpdate.innerHTML = "Actualizar";
      item.appendChild(btnUpdate);
      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn");
      btnDelete.classList.add("link__btn--delete");
      btnDelete.innerHTML = "Eliminar";
      item.appendChild(btnDelete);
      document.querySelector(".links").appendChild(item);
    }
  }
  const item = document.createElement("li");
  item.classList.add("user__item");
  const linkLabelDescription = document.createElement("label");
  linkLabelDescription.classList.add("link__Label");
  linkLabelDescription.innerHTML = "Descripción:";
  item.appendChild(linkLabelDescription);
  const linkDescription = document.createElement("input");
  linkDescription.classList.add("link__Description");
  item.appendChild(linkDescription);
  const linkLabelUrl = document.createElement("label");
  linkLabelUrl.classList.add("link__Label");
  linkLabelUrl.innerHTML = "Url:";
  item.appendChild(linkLabelUrl);
  const linkUrl = document.createElement("input");
  linkUrl.classList.add("link__Url");
  item.appendChild(linkUrl);
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.classList.add("link__btn--create");
  btn.innerHTML = "Agregar";
  btn.setAttribute("data-target", userName.value);
  item.appendChild(btn);
  document.querySelector(".links").appendChild(item);
};
const createLinkListeners = () => {
  const linkBtnsUpdate = document.querySelectorAll(".link__btn--update");
  const linkBtnsDelete = document.querySelectorAll(".link__btn--delete");
  const linkBtnCreate = document.querySelector(".link__btn--create");

  linkBtnCreate.addEventListener("click", (e) => {
    const linkDescription =
      e.target.parentElement.querySelector(".link__Description");
    const linkUrl = e.target.parentElement.querySelector(".link__Url");
    if (linkDescription.value === "" || linkUrl.value === "") {
      alert("Debe ingresar una descripción y un link");
    } else {
      userLinks.push({ link: linkDescription.value, url: linkUrl.value });
      console.log(userLinks);
      alert("Link agregado");
      updateUser("Link");
    }
  });
  linkBtnsDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      userLinks.splice(e.target.parentElement.getAttribute("data-index"), 1);
      updateUser("Link");
    });
  });
  linkBtnsUpdate.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const linkDescription =
        e.target.parentElement.querySelector(".link__Description");
      const linkUrl = e.target.parentElement.querySelector(".link__Url");
      if (linkDescription.value === "" || linkUrl.value === "") {
        alert("Debe ingresar una descripción y un link");
      } else {
        userLinks[e.target.parentElement.getAttribute("data-index")] = {
          link: linkDescription.value,
          url: linkUrl.value,
        };
      }
      updateUser("Link");
    });
  });
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
    createLinkListeners();
  }
  setTimeout(() => {
    lStorage.storageEndUserSession();
    window.location.href = "index.html";
  }, 1800000);
};
function updateUser(datos) {
  if (userEmail.value === "") {
    alert("Rellenar los campos obligatorios");
  } else {
    if (userPassword.value === "") {
      userPassword.value = user.userPassword;
    }
    if (userImage.value === "") {
      userImage.value = user.userImage;
    }
    const actualizado = users.updateUser(
      userName.value,
      userEmail.value,
      userPassword.value,
      userImage.value,
      userLinks,
      datos
    );
    if (actualizado === "Actualizado") {
      alert(`Usuario ${userName.value} actualizado`);
      lStorage.storageEndUserSession();
      window.location.href = "index.html";
    } else if (actualizado === "Iguales") {
      alert(`No hay datos que actualizar`);
      userPassword.value = "";
    }
  }
}

window.addEventListener("load", pageLoad());
formBtn.addEventListener("click", () => updateUser("user"));
