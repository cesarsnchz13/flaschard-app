import React, { useEffect, useState } from "react";
import {
  useParams,
  Route,
  useHistory,
  Link,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index.js";
import CardList from "./CardList";
import AddCard from "./AddCard";

function Deck() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [deckInfo, setDeckInfo] = useState({ name: "", cards: [] });
  console.log("DECKID: ", deckId);
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        console.log("Deck: ", deck);
        setDeckInfo(() => ({ ...deck }));
      } catch (error) {
        console.log("loadDeck error", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fa fa-home" title="Home"></i>
              <span> Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deckInfo.name}
          </li>
        </ol>
      </nav>

      {/* NAME AND DESCRIPTION */}
      <div>
        <h4>{deckInfo.name}</h4>
        <p>{deckInfo.description}</p>
      </div>

      {/* DECK BUTTONS */}
      <div className="row">
        <div className="column">
          <button
            type="button"
            className="btn btn-secondary"
            name="edit"
            onClick={() => history.push(`${url}/edit`)}
          >
            <i className="fa fa-edit"></i>
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`${url}/study`)}
          >
            <i className="fa fa-book"></i>
            <span> Study</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`${url}/cards/new`)}
          >
            <i className="fa fa-plus-square"> </i>
            Add Cards
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger"
            name="delete"
            onClick={() => deleteHandler(deckId)}
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
      <Switch>
        <Route>
          <CardList cards={deckInfo.cards} />
        </Route>
        <Route>
          <AddCard deckInfo={deckInfo.name} />
        </Route>
      </Switch>
    </>
  );
}
export default Deck;
