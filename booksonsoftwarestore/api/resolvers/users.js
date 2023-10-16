module.exports = {
  favorites(user, args, { dataSources }) {
    const userFavorites =
      dataSources.userDataSource.getUserById(user.id).favorites || [];
    const favoriteBooks = [];
    for (const fav of userFavorites) {
      favoriteBooks.push(dataSources.bookDataSource.getBookById(fav));
    }

    return favoriteBooks;
  }
};
