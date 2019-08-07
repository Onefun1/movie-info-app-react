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
  let [send, formStatus] = useState(false);
  let [title, titleStatus] = useState(true);
  let [actors, actorsStatus] = useState(true);
  let [year, yearStatus] = useState(true);

  let newMovie = {};
  let validTitle;
  let validActors;
  let validYear;

  const handleSubmit = e => {
    e.preventDefault();

    validTitle = /[\s.,A-Za-zАа-яёЁЇїІіЄєҐґ0-9-;:]+/.test(
      inputTitleRef.current.value
    );
    validActors = /[A-Z-А-ЯЁЁЇ]{1}[A-Za-zА-Яа-яЁёЁЇїІіЄєҐґ]+(\s+[A-Z-А-ЯЁЁЇ][A-Za-zА-Яа-яЁёЁЇїІіЄєҐґ,]{2,},?)/g.test(
      inputStarsRef.current.value
    );
    validYear =
      inputYearRef.current.value > 1900 &&
      inputYearRef.current.value <= currentYear;

    if (
      inputTitleRef.current.value &&
      inputYearRef.current.value &&
      inputFormatRef.current.value &&
      inputStarsRef.current.value
    ) {
      if (validActors && validTitle && validYear) {
        setStatus((correct = true));
        newMovie = {
          title: inputTitleRef.current.value,
          year: inputYearRef.current.value,
          format: inputFormatRef.current.value,
          stars: inputStarsRef.current.value.split(","),
          movieId: date.getTime() + Math.random()
        };
      } else {
        validTitle ? titleStatus((title = true)) : titleStatus((title = false));
        validActors
          ? actorsStatus((actors = true))
          : actorsStatus((actors = false));
        validYear ? yearStatus((year = true)) : yearStatus((year = false));

        return;
      }
    } else {
      setStatus((correct = false));
      formStatus((send = false));
      titleStatus((title = true));
      actorsStatus((actors = true));
      yearStatus((year = true));
      return;
    }

    props.addNewMovie(newMovie);
    inputTitleRef.current.value = "";
    inputYearRef.current.value = "";
    inputFormatRef.current.value = "VHS";
    inputStarsRef.current.value = "";
    formStatus((send = true));
    titleStatus((title = true));
    actorsStatus((actors = true));
    yearStatus((year = true));
    setStatus((correct = true));
  };

  const errorInlineStyle = {
    color: "red",
    textAlign: "center"
  };
  const warningMessage = message => (
    <p style={{ color: "red", marginTop: "0" }}>Sorry, {message}</p>
  );
  return (
    <div className="contaiter__form">
      <form className="form">
        {send ? (
          <h4 style={{ color: "green" }}>Movie was added in your list</h4>
        ) : (
          ""
        )}
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
            className={title ? "" : "inputErrorValidator"}
            type="text"
            name="title"
            id="title"
            placeholder="Enter film title"
            autoComplete="off"
            ref={inputTitleRef}
          />
          {title ? "" : warningMessage(<span>wrong title</span>)}
        </label>
        <label htmlFor="year">
          Year
          <input
            className={year ? "" : "inputErrorValidator"}
            type="number"
            name="year"
            id="year"
            min="1901"
            max={currentYear}
            required
            placeholder="Enter year"
            autoComplete="off"
            ref={inputYearRef}
          />
          {year
            ? ""
            : warningMessage(<span>wrong year (1901-{currentYear})</span>)}
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
            className={actors ? "" : "inputErrorValidator"}
            type="text"
            name="stars"
            id="stars"
            placeholder="FirstName LastName, FirstName LastName... "
            autoComplete="off"
            ref={inputStarsRef}
          />
          {actors ? "" : warningMessage(<span>wrong Actors list</span>)}
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
