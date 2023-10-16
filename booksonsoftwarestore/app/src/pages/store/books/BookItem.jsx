import * as React from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($bookId: ID!) {
    toggleFavoriteBook(bookId: $bookId) {
      id
      favorites {
        id
      }
    }
  }
`;

export function BookItem({ book }) {
  const { isAuthenticated } = React.useContext(AuthContext);
  const [toggle] = useMutation(TOGGLE_FAVORITE, {
    variables: { bookId: book.id },
  });

  const markFavorite = async () => {
    await toggle();
  };

  const { ID, title, thumbnail, sample = [] } = book;
  return (
    <div key={ID} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
          <h5>{`Day: ${day}`}</h5>
          {thumbnail ? <h5>{`Thumbnail: ${thumbnail}`}</h5> : null}
          {sample ? <h5>{`Sample: ${sample}`}</h5> : null}
        </div>
        <div className="panel-footer">
          {isAuthenticated && (
            <span style={{ padding: 2 }}>
              <button
                type="button"
                className="btn btn-default btn-lg"
                onClick={markFavorite}
              >
                <i
                  className={`fa ${favorite ? "fa-star" : "fa-star-o"}`}
                  aria-hidden="true"
                  style={{
                    color: favorite ? "gold" : undefined,
                  }}
                ></i>{" "}
                Favorite
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
