const users = new Users();
const interface = new Interface();

const usersList = storage.storageGetUsers();
interface.showUsers(usersList);
