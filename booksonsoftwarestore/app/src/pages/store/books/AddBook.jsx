import * as React from "react";
import { BookForm } from "../books/BookForm";

export function AddBook() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <BookForm />
          </div>
        </div>
      </section>
    </>
  );
}
