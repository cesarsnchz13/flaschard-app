import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api/index";

function CardList({ cards = [] }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const deleteHandler = async (cardId) => {
    const confirm = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (confirm) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  const cardList = cards.map((card, index) => (
    <div key={index} className="card">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-5">{card.front}</div>
          <div className="col-5">
            {card.back}
            <div className="row">
              <div className="column">
                <button
                  className="btn btn-secondary m-3"
                  onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
                >
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-danger m-3"
                  onClick={() => deleteHandler(card.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="24"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <h2>Cards</h2>
      {cardList}
    </>
  );
}
export default CardList;
