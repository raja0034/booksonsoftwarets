import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { AddBook } from "./books/AddBook";
import { Books } from "./books/Books";
import { Book } from "./books/Book";
import "./style-books.css";
import { AboutUs } from "./AboutUs";
import { Navigation } from "./Navigation";

export function Store() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}/books/new`}>
          <AddBook />
        </Route>
        <Route path={`${path}/books/:book_id`}>
          <Book />
        </Route>
        <Route path={`${path}/books`}>
          <Books />
        </Route>
        <Route path={`${path}/about`}>
          <AboutUs />
        </Route>
        <Route path={`${path}`}>
          <Navigation />
        </Route>
      </Switch>
    </>
  );
}
