import React, { useState } from "react";

import "./Form.css";

export default function Form(props) {
  const inputTitleRef = React.createRef();
  const inputYearRef = React.createRef();
  const inputFormatRef = React.createRef();
  const inputStarsRef = React.createRef();

  let [corect, setStatus] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    let date = new Date();

    if (
      inputTitleRef.current.value &&
      inputYearRef.current.value &&
      inputFormatRef.current.value &&
      inputStarsRef.current.value
    ) {
      setStatus((corect = true));
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
      inputFormatRef.current.value = "";
      inputStarsRef.current.value = "";
    } else {
      setStatus((corect = false));
      return;
    }
  };
  return (
    <div className="contaiter__form">
      <form className="form">
        {!corect ? (
          <h3 style={{ color: "red", textAlign: "center" }}>Wrong form</h3>
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
            pattern="^[A-ZА-ЯЁ]{1}[a-zа-яё]+$"
            ref={inputTitleRef}
          />
        </label>
        <label htmlFor="year">
          Year
          <input
            type="text"
            name="year"
            id="year"
            required
            placeholder="Enter year"
            autoComplete="off"
            pattern="[0-9]{4}"
            ref={inputYearRef}
          />
        </label>
        <label htmlFor="format">
          Format
          <input
            type="text"
            name="format"
            id="format"
            required
            placeholder="Enter format"
            autoComplete="off"
            ref={inputFormatRef}
          />
        </label>
        <label htmlFor="stars">
          Actors
          <textarea
            type="text"
            name="stars"
            id="stars"
            rows="2"
            required
            placeholder="FirstName LastName, FirstName LastName... "
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
