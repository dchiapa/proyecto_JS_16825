const users = new Users();
const interface = new Interface();
const lstorage = new Storage();
const api_URL = "https://jsonplaceholder.typicode.com/users/";

let usersList = storage.storageGetUsers();

interface.showUsers(usersList);

const usersListPreview = document.querySelectorAll(".profile");
const usersListSearch = document.querySelector(".search__input");

usersListPreview.forEach((user) => {
  user.addEventListener("click", (e) => {
    let userName = "";
    switch (e.target.nodeName) {
      case "IMG":
        userName = e.target.getAttribute("alt");
        break;
      case "ARTICLE":
        userName = e.target.getAttribute("data-user");
        break;
      case "H2":
        userName = e.target.textContent;
        break;
    }
    lstorage.storageSetUserSession(userName, "usersList");
    window.location.href = "./userPage.html";
  });
});
usersListSearch.addEventListener("input", (e) => {
  console.log(e.target.value);
  usersListFiltered = usersList.filter((user) =>
    user.userName.includes(e.target.value)
  );
  if (usersListFiltered.length > 0) {
    interface.removeUsers();
    interface.showUsers(usersListFiltered);
  } else {
    interface.removeUsers();
    interface.showUsers(usersList);
  }
});
