import React, { useState } from "react";

import "./Section.css";

const Section = props => {
  const { title, year, format, stars, movieId } = props.movie;
  let [open, setStatus] = useState(false);
  let [will, setCheck] = useState(false);

  function toggleWillWatch() {
    const { movie, removeMovieFromWillWatch, addMovieToWillWatch } = props;
    if (will) {
      removeMovieFromWillWatch(movieId);
      setCheck((will = !will));
    } else {
      addMovieToWillWatch(movie);
      setCheck((will = !will));
    }
  }
  return (
    <section className="container__section--item">
      <span
        className="removeButton"
        onClick={() => props.removeItem(movieId)}
        style={{ float: "right" }}
      >
        ✖
      </span>
      <h1
        className="container__section--title"
        onClick={() => setStatus((open = !open))}
      >
        {title}
      </h1>

      {open ? (
        <>
          <div className="container__section--info">
            <p>
              <b>ID:</b> {movieId}
            </p>
            <p>
              <b>Year:</b> {year}
            </p>
            <p>
              {" "}
              <b>Format:</b> {format}{" "}
            </p>
            <p>
              {" "}
              <b>Actors:</b> {stars.join(", ")}{" "}
            </p>
          </div>
          <div className="container__section--buttons">
            <div
              className={will ? "btn toggle" : "btn"}
              onClick={() => toggleWillWatch()}
            >
              {will ? "Added" : "Watch"}
            </div>
            <div
              className="btn delete"
              onClick={() => props.removeItem(movieId)}
            >
              Delete
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export default Section;
