const Query = require("./query");
const Mutation = require("./mutation");
const Book = require("./books");
const User = require("./users");
const resolvers = { Query, Mutation, Book, User };

module.exports = resolvers;
