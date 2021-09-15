class Interface {
  constructor() {
    this.container = $(".content__users");
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
  showUser(user) {
    if (user.userLinks.length > 0) {
      this.userProfile = $("<article></article>");
      this.userProfile[0].classList.add("profile");
      this.userImg = $("<img/>");
      this.userImg[0].classList.add("profile__img");
      this.userImg[0].src = user.userImage;
      this.userImg[0].alt = user.userName;
      this.userName = $("<h1></h1>");
      this.userName[0].classList.add("profile__title");
      this.userName[0].textContent = user.userName;
      this.userProfile[0].append(this.userImg[0]);
      this.userProfile[0].append(this.userName[0]);
      user.userLinks.forEach((link) => {
        this.userLink = $("<a></a>");
        this.userLink[0].classList.add("btn");
        this.userLink[0].href = link.url;
        this.userLink[0].textContent = link.link;
        this.userLink[0].target = "_blank";
        this.userProfile.append(this.userLink);
      });
      $(".content").append(this.userProfile);
    } else {
      alert("No hay enlaces para mostrar");
      window.location.href = "usersList.html";
    }
  }
  loadUsers(users) {
    for (let user of users) {
      this.userProfile = $("<article></article>");
      this.userProfile[0].classList.add("profile");
      this.userProfile[0].classList.add("profile__card");
      this.userProfile[0].setAttribute("data-user", user.userName);
      this.userImg = $("<img/>");
      this.userImg[0].classList.add("profile__img");
      this.userImg[0].src = user.userImage;
      this.userImg[0].alt = user.userName;
      this.userName = $("<h2></h2>");
      this.userName[0].classList.add("profile__title");
      this.userName[0].textContent = user.userName;
      this.userProfile[0].append(this.userImg[0]);
      this.userProfile[0].append(this.userName[0]);
      this.container.append(this.userProfile[0]);
    }
  }
  loadMessage() {
    this.message = $("<article></article>");
    this.message[0].classList.add("message");
    this.messageText = $("<p></p>");
    this.messageText[0].classList.add("message__text");
    this.messageText[0].textContent =
      "No hay usuarios en la base de datos. Puede agregar usuarios en la página principal.";
    this.message.append(this.messageText);
    this.btn = $("<button></button>");
    this.btn[0].classList.add("btn");
    this.btn[0].textContent = "Agregar usuarios desde api";
    this.btn.on("click", () => this.addUser());
    this.message.append(this.btn);
    this.container.append(this.message);
  }
  addUser() {
    this.message.remove();
    $.ajax({
      url: api_URL,
      context: document.body,
    }).done(function (data) {
      this.user = data.slice(0, 1)[0];
      this.user.userName = this.user.name;
      this.user.userEmail = this.user.email;
      this.user.userImage =
        "https://dragonball.guru/wp-content/uploads/2021/03/goku-profile-e1616173641804.png";
      this.user.userPassword = "1234";
      delete this.user.username;
      delete this.user.name;
      delete this.user.email;
      delete this.user.phone;
      delete this.user.cell;
      delete this.user.company;
      delete this.user.address;
      delete this.user.website;
      users.createUser(this.user);
      window.location.reload();
    });
  }
  removeUsers() {
    this.container.empty();
  }
}
