import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "../../utils/api/index.js";
import { useHistory, useParams, Link } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
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
        setDeckInfo(() => ({ ...deck }));
      } catch (error) {
        console.log("loadDeck error", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  //create an if statement that alerts if the form is empty
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.front.length < 1 || formData.back.length < 1) {
        alert("These fields cannot be empty");
      } else {
        await createCard(deckId, formData);
        history.go();
      }
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
            Add Card
          </li>
        </ol>
      </nav>

      <div>
        <h1>Add Card</h1>
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

export default AddCard;
