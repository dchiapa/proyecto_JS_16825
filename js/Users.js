const storage = new Storage();

class Users {
  constructor() {}
  //* Manejo de usuarios
  createUser(userName, userEmail, userPassword, userImage) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userImage = userImage;
    this.usersList = storage.storageGetUsers();
    this.validateName();
    this.validateEmail();
    if (this.userName !== null) {
      if (this.userEmail !== null && this.userPassword !== null) {
        if (this.userImage === "") {
          this.userImage =
            "https://dragonball.guru/wp-content/uploads/2021/03/goku-profile-e1616173641804.png";
        }
        this.usersList.push({
          id: this.usersList.length + 1,
          userName: this.userName,
          userEmail: this.userEmail,
          userPassword: this.userPassword,
          userImage: this.userImage,
          userLinks: [],
        });
        storage.storageUpdateUsersList();
        this.newUser = true;
      } else this.newUser = false;
      if (!this.newUser) {
        alert("El usuario no ha sido creado.");
      } else {
        alert(
          `Usuario creado con éxito\nNombre de usuario: ${this.userName}\nEmail: ${this.userEmail}`
        );
      }
    } else this.newUser = false;
  }
  deleteUser(userName) {
    this.getUser(userName);
    if (this.user) {
      this.usersList.splice(this.usersList.indexOf(this.user), 1);
      storage.storageUpdateUsersList();
      alert("Usuario eliminado");
    }
  }
  getUser(userName, page) {
    this.usersList = storage.storageGetUsers();
    if (this.usersList) {
      this.user = this.usersList.find((user) => user.userName === userName);
      if (!this.user) {
        this.user = null;
      }
    }
    if (page === "login") {
      return this.user;
    }
  }
  updateUser(userName, userEmail, userPassword, userImage, userLinks) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userImage = userImage;
    this.userLinks = userLinks;
    this.getUser(userName);
    this.usersList = storage.storageGetUsers();
    if (this.user) {
      this.validateEmail(true);
      if (this.userEmail !== null && this.userPassword !== null) {
        if (this.userImage === "") {
          this.userImage =
            "https://dragonball.guru/wp-content/uploads/2021/03/goku-profile-e1616173641804.png";
        }
        if (this.userName) {
          if (
            this.userEmail !== this.user.userEmail ||
            this.userPassword !== this.user.userPassword ||
            this.userImage !== this.user.userImage ||
            this.userLinks !== this.user.userLinks
          ) {
            this.user.userEmail = this.userEmail;
            this.user.userPassword = this.userPassword;
            this.user.userImage = this.userImage;
            this.user.userLinks = this.userLinks;
            this.usersList[this.user.id - 1] = this.user;
            storage.storageUpdateUsersList();
            return "Actualizado";
          } else {
            return "Iguales";
          }
        }
      }
    }
  }
  showUser() {
    //? Método que obtiene un usuario por nombre
  }
  //* Manejo de usuarios
  //* Validaciones
  validateName(update = false) {
    if (update !== true) {
      if (
        this.usersList &&
        this.usersList.find((user) => user.userName === this.userName)
      ) {
        alert("El nombre de usuario ya existe");
        this.userName = null;
      }
    }
  }
  validateEmail(update = false) {
    if (update !== true) {
      if (
        this.usersList &&
        this.usersList.find((user) => user.userEmail == this.userEmail)
      ) {
        alert("El mail ingresado ya esta asociado a una cuenta.");
        this.userEmail = null;
        return;
      }
    } else {
      if (this.usersList.find((user) => user.userEmail == this.userEmail)) {
        return;
      }
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(this.userEmail).toLowerCase())) {
      alert("El mail ingresado no es válido");
      this.userEmail = null;
    }
  }
  //* Validaciones
}
