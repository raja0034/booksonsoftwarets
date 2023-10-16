const _ = require("lodash");

module.exports = {
  books: (parent, args, { dataSources }, info) => {
    const allBooks = dataSources.bookDataSource.getBooks(args);
    return allBooks;
  },
  bookById: (parent, { id }, { dataSources }, info) => {
    const allBooks = dataSources.bookDataSource.getBookById(id);
    return allBooks;
  },
  users: async (parent, args, { user, dataSources }, info) => {
    const users = await dataSources.userDataSource.getUsers();
    return users;
  },
  userById: async (parent, { id }, { dataSources }, info) => {
    const user = await dataSources.userDataSource.getUserById(id);
    return user;
  },
  me: async (parent, { id }, { dataSources, user }, info) => {
    if (user) {
      return dataSources.userDataSource.getUserById(user.sub);
    }
    return undefined;
  },
};
