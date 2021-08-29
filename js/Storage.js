class Storage {
  storageUpdateUsersList = () =>
    localStorage.setItem("usersList", JSON.stringify(this.usersList));

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
}
