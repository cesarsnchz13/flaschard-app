import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api/index.js";

function EditDeck() {
  const history = useHistory();
  const initialForms = { name: "", description: "" };
  const { deckId } = useParams();
  const [formInfo, setFormInfo] = useState(initialForms);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setFormInfo(deck);
      } catch (error) {
        console.log("loadDeck error", error);
      }
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormInfo({
      ...formInfo,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateDeck(formInfo);
      history.push(`/decks/${response.id}`);
    } catch (error) {
      console.log("submit error: ", error);
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
            <span>{formInfo.name}</span>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <div>
        <h1>Edit Deck</h1>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={formInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Description</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            id="description"
            value={formInfo.description}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="row">
        <div className="column">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <div className="column">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDeck;
