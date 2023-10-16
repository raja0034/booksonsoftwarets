import * as React from "react";
import { BookDetails } from "./BookDetails";

export function Book() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <BookDetails />
          </div>
        </div>
      </section>
    </>
  );
}
