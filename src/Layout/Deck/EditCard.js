import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../utils/api/index.js";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deckInfo, setDeckInfo] = useState({});

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

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCard() {
      try {
        const card = await readCard(cardId, abortController.signal);
        console.log("CARD: ", card);
        setFormData(card);
      } catch (error) {
        console.log(error);
      }
    }
    loadCard();
  }, [cardId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    console.log("Form Data: ", formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard(formData);
      history.go(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              <span>{deckInfo.name}</span>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>

      <div>
        <h1>Edit Card</h1>
      </div>
      <CardForm
        deckId={deckId}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
export default EditCard;
