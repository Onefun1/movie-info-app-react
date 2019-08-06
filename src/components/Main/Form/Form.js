import React, { useState } from "react";

import "./Form.css";

export default function Form(props) {
  const inputTitleRef = React.createRef();
  const inputYearRef = React.createRef();
  const inputFormatRef = React.createRef();
  const inputStarsRef = React.createRef();

  let date = new Date();
  let currentYear = date.getFullYear();

  let [correct, setStatus] = useState(true);

  const handleSubmit = e => {
    if (
      inputTitleRef.current.value &&
      inputYearRef.current.value &&
      inputFormatRef.current.value &&
      inputStarsRef.current.value
    ) {
      setStatus((correct = true));
      let newMovie = {
        title: inputTitleRef.current.value,
        year: inputYearRef.current.value,
        format: inputFormatRef.current.value,
        stars: inputStarsRef.current.value.split(","),
        movieId: date.getTime() + Math.random()
      };

      props.addNewMovie(newMovie);
      inputTitleRef.current.value = "";
      inputYearRef.current.value = "";
      inputFormatRef.current.value = "DVD";
      inputStarsRef.current.value = "";
    } else {
      setStatus((correct = false));
      return;
    }
  };

  const errorInlineStyle = {
    color: "red",
    textAlign: "center"
  };
  return (
    <div className="contaiter__form">
      <form className="form">
        {!correct ? (
          <>
            <h4 style={errorInlineStyle}>Wrong form</h4>
            <span style={errorInlineStyle}>Fill all lines, please</span>
            <br />
          </>
        ) : (
          ""
        )}
        <label htmlFor="title">
          Film title
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Enter film title"
            autoComplete="off"
            pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
            ref={inputTitleRef}
          />
        </label>
        <label htmlFor="year">
          Year
          <input
            type="number"
            name="year"
            id="year"
            min="1901"
            max={currentYear}
            required
            placeholder="Enter year"
            autoComplete="off"
            pattern="[0-9]{4}"
            ref={inputYearRef}
          />
        </label>
        <label htmlFor="format">
          Format
          <select type="text" name="format" id="format" ref={inputFormatRef}>
            <option value="VHS">VHS</option>
            <option value="DVD">DVD</option>
            <option value="Blu-Ray">Blu-Ray</option>
          </select>
        </label>
        <label htmlFor="stars">
          Actors
          <input
            type="text"
            name="stars"
            id="stars"
            required
            placeholder="FirstName LastName, FirstName LastName... "
            autoComplete="off"
            pattern="\^[a-zA-Z][a-zA-Z-_\.\,]{1,20}$\"
            ref={inputStarsRef}
          />
        </label>
        <div className="wrapper__button">
          <button type="submit" onClick={e => handleSubmit(e)} className="btn">
            Add
          </button>
          <button type="reset" className="btn delete">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
