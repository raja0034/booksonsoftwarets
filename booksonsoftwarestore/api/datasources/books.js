const { DataSource } = require("apollo-datasource");
const lodashId = require("lodash-id");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./data/books.json");
const db = low(adapter);
db._.mixin(lodashId);

class BookDataSource extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.db = db.get("books");
  }

  getBooks(args) {
    return this.db.filter(args).value();
  }

  getBookById(id) {
    return this.db.getById(id).value();
  }

  createBook(book) {
    return this.db.insert(book).write();
  }
}

module.exports = BookDataSource;
