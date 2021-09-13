class Storage {
  storageUpdateUsersList = () => {
    localStorage.setItem("usersList", JSON.stringify(this.usersList));
  };
  storageGetUsers = () => {
    this.usersList = localStorage.getItem("usersList");
    switch (this.usersList) {
      case null:
        this.usersList = [];
        break;
      case []:
        this.usersList = [];
        break;
      default:
        this.usersList = JSON.parse(this.usersList);
        break;
    }
    return this.usersList;
  };
  storageGetUser = (userName) => {
    this.usersList = JSON.parse(localStorage.getItem("usersList"));
    this.user = this.usersList.find((user) => user.userName === userName);
    return this.user;
  };
  storageGetUserSession = (page) => {
    if (page === "usersList") {
      this.userSession = sessionStorage.getItem("userProfile");
    } else {
      this.userSession = sessionStorage.getItem("loggedUser");
      switch (this.userSession) {
        case null:
          this.userSession = [];
          break;
        case []:
          this.userSession = [];
          break;
        default:
          this.userSession = JSON.parse(this.userSession);
          break;
      }
    }
    return this.userSession;
  };
  storageSetUserSession = (user, page) => {
    if (page === "usersList") {
      sessionStorage.setItem("userProfile", user);
    } else {
      if (this.storageGetUserSession().length === 0) {
        sessionStorage.setItem("loggedUser", user);
      } else alert("Ya hay una sesión iniciada");
    }
  };
  storageEndUserSession = () => {
    sessionStorage.removeItem("loggedUser");
    alert("Sesión finalizada");
    window.location.href = "index.html";
  };
}
