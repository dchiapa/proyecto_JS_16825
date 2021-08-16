class Users {
  constructor({ id = "", userName = "", userEmail = "", userPassword = "" }) {
    id && (this.id = id);
    userName && (this.userName = userName);
    userEmail && (this.userEmail = userEmail);
    userPassword && (this.userPassword = userPassword);
  }
  createUser() {
    //? Método que crea un usuario si no existe
    this.validateName();
    if (this.userName !== null) {
      this.validateEmail();
      if (this.userEmail !== "ESC" && this.userEmail !== null) {
        this.validatePassword();
        if (this.userPassword !== null) {
          this.id = usersList.length + 1;
          usersList.push({
            id: this.id,
            userName: this.userName,
            userEmail: this.userEmail,
            userPassword: this.userPassword,
          });
          this.newUser = true;
        } else this.newUser = false;
      } else this.newUser = false;
    } else this.newUser = false;
    if (!this.newUser) {
      alert(
        "El usuario no ha sido creado.\nPara volver a comenzar recargue la página"
      );
    } else
      alert(
        `Usuario creado con éxito\nNombre de usuario: ${this.userName}\nEmail: ${this.userEmail}`
      );
  }
  deleteUser() {
    //? Método que elimina un usuario, si existe
  }
  updateUser() {
    //? Método que modifica un usuario, si existe
  }
  getUsers() {
    //? Método que obtiene todos los usuarios
  }
  showUser(users, userName) {
    //? Método que obtiene un usuario por nombre
    console.log(users.find((user) => user.userName === userName));
  }
  orderUsersID = (users) => users.sort((a, b) => a.id - b.id);
  orderUsersName = (users) => {
    this.usersNames = users.map((user) => user.userName);
    return this.usersNames
      .sort()
      .map((userName) => users.find((user) => user.userName === userName));
  };
  validateName() {
    do {
      this.userName = prompt("Ingrese el nombre de usuario:");
    } while (
      usersList.find((user) => user.userName === this.userName) ||
      this.userName === ""
    );
  }
  validateEmail() {
    do {
      this.userEmail = prompt("Ingrese su email:");
    } while (this.userEmail === "" || this.userEmail === "ESC");
    if (usersList.find((user) => user.userEmail == this.userEmail)) {
      alert(
        "El mail ingresado ya esta asociado a una cuenta.\nPor favor recupere su contraseña o ingrese a la plataforma."
      );
      this.userEmail = "ESC";
    }
  }
  validatePassword() {
    do {
      this.userPassword = prompt("Ingrese su contraseña:");
    } while (this.userPassword === "");
  }
}
