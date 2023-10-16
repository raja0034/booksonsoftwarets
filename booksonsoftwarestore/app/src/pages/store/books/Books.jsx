import * as React from "react";
import { Link } from "react-router-dom";
import { BookList } from "./BookList";

export function Books() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row" style={{ padding: 10 }}>
            <Link
              className="btn btn-primary btn-lg center-block"
              to={`/store/books/new`}
            >
              Submit a Book!
            </Link>
          </div>
          <div className="row">
            <BookList />
          </div>
        </div>
      </section>
    </>
  );
}
