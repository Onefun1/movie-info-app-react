import React, { Component, useState } from "react";

import "./Main.css";

class Main extends Component {
  state = {
    movies: [],
    isLoading: false,
    inputFilter: "",
    onload: false,
    moviesWillWatch: [],
    sort: false
  };

  handleGetMoviesData = () => {
    this.setState({
      onload: true
    });
  };

  handleInputFileLoader = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      let loadedFileContentArray = reader.result
        .split("\n\n")
        .filter(Boolean)
        .map(item => {
          const [title, year, format, stars] = item.split("\n");

          const foo = value => value.split(":")[1].trim();
          const getUniqueId = () => {
            const date = new Date();

            return date.getTime() + Math.random();
          };

          return {
            title: foo(title),
            year: foo(year),
            format: foo(format),
            stars: foo(stars)
              .split(",")
              .map(item => item.trim()),
            movieId: getUniqueId()
          };
        });

      this.setState({
        movies: loadedFileContentArray,
        onload: true
      });
    };

    reader.onerror = function() {
      console.log(reader.error);
    };
  };

  removeMovieById = id => {
    const updateMovies = this.state.movies.filter(function(movie) {
      return movie.movieId !== id;
    });

    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  removeMovieFromWillWatch = id => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(
      movie
    ) {
      return movie.movieId !== id;
    });

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };
  sortByAbc = () => {
    let moviesSort = [...this.state.movies];
    console.log(moviesSort);
    if (!this.state.sort) {
      moviesSort.sort(function(a, b) {
        var nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      moviesSort.sort(function(a, b) {
        var nameA = a.title.toLowerCase(),
          nameB = b.title.toLowerCase();
        if (nameA < nameB) return 1;
        if (nameA > nameB) return -1;
        return 0;
      });
    }
    this.setState({
      movies: moviesSort,
      sort: !this.state.sort
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <main className="container__main">
        <button onClick={this.sortByAbc}>SORT</button>
        <article className="container__main--inputFilter">
          {/* <label>
            <input
              type="text"
              id="inputFilter"
              name="inputFilter"
              value={this.state.inputFilter}
              onChange={this.handleChangeInputFilterValue}
              placeholder="what are we looking for?"
            />
          </label> */}
          <label>
            <input
              type="file"
              id="inputLoader"
              name="inputLoader"
              onChange={this.handleInputFileLoader}
              placeholder="what are we looking for?"
            />
          </label>
        </article>
        {this.state.onload ? (
          <article className="container__main--moviesList">
            {movies.map(movie => {
              return (
                <Section
                  key={movie.title}
                  movie={movie}
                  removeItem={this.removeMovieById}
                  addMovieToWillWatch={this.addMovieToWillWatch}
                  removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                />
              );
            })}
          </article>
        ) : (
          <h1>Chose the file and load it</h1>
        )}
      </main>
    );
  }
}

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

export default Main;
