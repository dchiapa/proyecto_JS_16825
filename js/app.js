const users = new Users({
  id: "",
  userName: "",
  userEmail: "",
  userPassword: "",
});
const usersList = [
  {
    id: 2,
    userName: "Ezequiel",
    userEmail: "mail@mail.com",
    userPassword: "A123",
  },
  { id: 1, userName: "Juan", userEmail: "mail@mail.com", userPassword: "A123" },
  {
    id: 3,
    userName: "Pablo",
    userEmail: "mail@mail.com",
    userPassword: "A123",
  },
];

console.log(usersList);
usersList.push(
  new Users({
    id: usersList.length + 1,
    userName: "Diego",
    userEmail: "mail@mail.com",
    userPassword: "123456",
  })
);
console.log(usersList);

users.showUser(usersList, "Ezequiel");

console.log(users.orderUsersID(usersList));

console.log(users.orderUsersName(usersList));

users.createUser(usersList);
console.log(usersList);
