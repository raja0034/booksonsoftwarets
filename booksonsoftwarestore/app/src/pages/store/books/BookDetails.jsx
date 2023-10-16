import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { BookItem } from "./BookItem";

export const BOOK_BY_ID = gql`
  query bookById($id: ID!) {
    bookById(id: $id) {
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

export function BookDetails() {
  const { book_id } = useParams();
  const { loading, error, data } = useQuery(BOOK_BY_ID, {
    variables: { id: book_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const book = data.bookById;

  return (
    <BookItem
      book={{
        ...book,
        favorite: data.user?.favorites
          .map(favorite => favorite.id)
          .includes(book.id),
      }}
    />
  );
}
