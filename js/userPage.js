const lStorage = new Storage();
const interface = new Interface();
$(document).ready(() => {
  let user = lStorage.storageGetUserSession("usersList");
  user = lStorage.storageGetUser(user);
  interface.showUser(user);
});
