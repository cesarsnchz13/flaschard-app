import React, { useState, useEffect } from "react";
import "./index.css";
import { listDecks, deleteDeck } from "../utils/api/index.js";
import { useHistory } from "react-router-dom";

function Home() {
  const [deckInfo, setDeckInfo] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      try {
        const decks = await listDecks();
        setDeckInfo(() => [...decks]);
      } catch (error) {
        console.log("loadDecks: Error");
      }
    }
    loadDecks();
  }, []);

  const deleteHandler = async (deckId) => {
    const confirm = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      history.go(0);
    }
  };
  console.log(deckInfo);

  const deckList = deckInfo.map((deck) => (
    <div key={deck.id}>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="column">
              <h3 className="card-title mb-2 text-secondary">{deck.name}</h3>
            </div>
            <div className="column text-muted">
              <p> {deck.cards.length} cards</p>
            </div>
          </div>

          <p className="card-text">{deck.description}</p>

          <div className="row">
            <div className="column">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deck.id}`)}
              >
                <i className="fa fa-eye"></i>
                <span> View</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                <i className="fa fa-book"></i>
                Study
              </button>
            </div>
            <div className="column">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteHandler(deck.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
  ));

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/decks/new`)}
      >
        <strong>+</strong>Create Deck
      </button>
      {deckList}
    </>
  );
}

export default Home;
