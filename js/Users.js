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
          userPicture: this.userImage,
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
        alert("Usuario no encontrado");
      }
    }
    if (page === "login") {
      return this.user;
    }
  }
  updateUser(userName, userEmail, userPassword, userImage) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userImage = userImage;
    this.getUser(userName);
    if (this.user) {
      this.validateName(true);
      if (this.userName !== null) {
        this.validateEmail();
        if (this.userEmail !== null && this.userPassword !== null) {
          if (this.userImage === "") {
            this.userImage =
              "https://dragonball.guru/wp-content/uploads/2021/03/goku-profile-e1616173641804.png";
          }
          storage.storageUpdateUsersList();
          alert(
            `Usuario actualizado\nUserName: ${this.userName}\n Email: ${this.userEmail}`
          );
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
    if (
      this.usersList &&
      this.usersList.find((user) => user.userName === this.userName)
    ) {
      if (update !== true) {
        alert("El nombre de usuario ya existe");
        this.userName = null;
      }
    }
  }
  validateEmail(update = false) {
    if (
      this.usersList &&
      this.usersList.find((user) => user.userEmail == this.userEmail)
    ) {
      if (update !== true) {
        alert(
          "El mail ingresado ya esta asociado a una cuenta.\nPor favor recupere su contraseña o ingrese a la plataforma."
        );
        this.userName = null;
      } else {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.userName).toLowerCase())) {
          alert("El mail ingresado no es válido");
          this.userName = null;
        }
      }
    }
  }
  //* Validaciones
}
