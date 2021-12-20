import React, { useState } from "react";
import "./index.css";
import { createDeck } from "../utils/api/index.js";
import { useHistory, Link } from "react-router-dom";

function CreateDeck() {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.name.length < 1 || formData.description.length < 1) {
        alert("These fields cannot be empty");
      } else {
        const response = await createDeck(formData);
        history.push(`/decks/${response.id}`);
      }
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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div>
        <h1>Create Deck</h1>
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="column">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => history.push("/")}
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
      </form>
    </>
  );
}

export default CreateDeck;
