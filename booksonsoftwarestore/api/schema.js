const { gql } = require("apollo-server");

module.exports = gql`
  directive @requiresAdmin on FIELD_DEFINITION
  directive @cost(value: Int) on FIELD_DEFINITION
  enum Role {
    ADMIN
    USER
  }

  input BookInput {
    title: String!
    thumbnail: String
    sample: String
    favorite: Boolean
  }

  type Book {
    id: ID!
    title: String!
    description: String @cost(value: 5)
    thumbnail: String
    sample: String
    track: String
    @deprecated(
      reason: "Too many books do not fit into a single track, we will be migrating to a tags based library in the future..."
    )
    favorite: Boolean
  }

  type Query @rateLimit(limit: 5, duration: 10) {
    books(
      id: ID
      title: String
      thumbnail: String
      sample: String
      favorite: Boolean
    ): [Book]
    bookById(id: ID): Book
    users: [User] @requiresAdmin
    userById(id: ID): User
    me: User
  }

  type User {
    id: String!
    email: String!
    favorites: [Book!]
    role: Role
    speaker: Speaker
  }

  input Credentials {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
  }

  type Mutation {
    createBook(book: BookInput): Book
    toggleFavoriteBook(bookId: ID!): User
    signUp(credentials: Credentials!): AuthPayload
    signIn(credentials: Credentials!): AuthPayload
    userInfo: AuthPayload
    signOut: AuthPayload
  }
`;
