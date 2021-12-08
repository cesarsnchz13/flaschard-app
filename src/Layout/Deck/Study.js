import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index.js";

function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialDisplay = {
    deck: { name: "loading", cards: [{ front: "", back: "" }] },
    frontDisplayed: true,
    index: 0,
  };
  const [display, setDisplay] = useState(initialDisplay);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setDisplay((current) => ({
          ...current,
          deck: deck,
        }));
      } catch (error) {
        console.log("loadDeck error", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  console.log("display", display);

  function flipButtonHandler() {
    setDisplay({
      ...display,
      frontDisplayed: !display.frontDisplayed,
    });
  }
  function nextButtonHandler() {
    if (display.index + 1 === display.deck.cards.length) {
      const confirm = window.confirm(
        "Restart cards?\n\n Click 'cancel to return to the home page."
      );
      if (confirm) {
        history.go(0);
      } else {
        history.push("/");
      }
    }
    setDisplay({
      ...display,
      index: display.index + 1,
      frontDisplayed: true,
    });
  }

  const breadcrumbNav = (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fa fa-home" title="Home"></i>
              <span> Home</span>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              <span>{display.deck.name}</span>
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <div>
        <h1>{display.deck.name}: Study</h1>
      </div>
    </>
  );

  if (display.deck.cards.length < 3) {
    return (
      // NOT ENOUGH CARDS
      <>
        {breadcrumbNav}
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are{" "}
          {display.deck.cards.length} in this deck.
        </p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deckId}/cards/new`)}
        >
          <i className="fa fa-plus-square"> </i>
          Add Cards
        </button>
      </>
    );
  }
  return (
    <>
      {/* STUDY CARDS */}

      {breadcrumbNav}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {display.index + 1} of {display.deck.cards.length}
          </h5>
          <p className="card-text">
            {display.frontDisplayed
              ? `FRONT: ${display.deck.cards[display.index].front}`
              : `BACK: ${display.deck.cards[display.index].back}`}
          </p>
          <div className="row">
            <div className="column">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={flipButtonHandler}
              >
                Flip
              </button>
            </div>
            <div className="column">
              {!display.frontDisplayed && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={nextButtonHandler}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Study;
