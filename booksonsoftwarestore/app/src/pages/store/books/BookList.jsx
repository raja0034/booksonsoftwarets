import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { BookItem } from "./BookItem";

export const BOOKS = gql`
  query books {
    books {
      id
      title
      thumbnail
      sample
    }
    user: me {
      id
      favorites {
        id
      }
    }
  }
`;

export function BookList() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(book => (
    <BookItem
      key={book.id}
      book={{
        ...book,
        favorite: data.user?.favorites
          .map(favorite => favorite.id)
          .includes(book.id),
      }}
    />
  ));
}
