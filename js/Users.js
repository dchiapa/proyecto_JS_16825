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
    this.validateEmail();
    if (this.userEmail !== "ESC") {
      this.validatePassword();
      this.id = usersList.length + 1;
      usersList.push({
        id: this.id,
        userName: this.userName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
      });
    }
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
      this.userName === "" ||
      this.userName === null
    );
  }
  validateEmail() {
    do {
      this.userEmail = prompt("Ingrese su email:");
    } while (
      this.userEmail === "" ||
      this.userEmail === null ||
      this.userEmail === "ESC"
    );
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
    } while (this.userPassword === "" || this.userPassword === null);
  }
}
