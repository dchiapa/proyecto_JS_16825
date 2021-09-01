class Interface {
  constructor() {
    this.container = document.querySelector(".content");
  }
  showUsers(users) {
    switch (users.length) {
      case 0:
        this.loadMessage();
        break;
      default:
        this.loadUsers(users);
        break;
    }
  }
  loadUsers(users) {
    for (let user of users) {
      this.userProfile = document.createElement("article");
      this.userProfile.classList.add("profile__preview");
      this.userImg = document.createElement("img");
      this.userImg.classList.add("profile__img");
      this.userImg.src = user.userImage;
      this.userImg.alt = user.userName;
      this.userName = document.createElement("h2");
      this.userName.classList.add("profile__title");
      this.userName.textContent = user.userName;
      this.userProfile.appendChild(this.userImg);
      this.userProfile.appendChild(this.userName);
      this.container.appendChild(this.userProfile);
    }
  }
  loadMessage() {
    this.message = document.createElement("article");
    this.message.classList.add("message");
    this.messageText = document.createElement("p");
    this.messageText.classList.add("message__text");
    this.messageText.textContent =
      "No hay usuarios en la base de datos. Puede agregar usuarios en la página principal.";
    this.message.appendChild(this.messageText);
    this.container.appendChild(this.message);
  }
}
