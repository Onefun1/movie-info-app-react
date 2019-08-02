import React, { Component } from "react";

import Section from "./Section/Section";
import Form from "./Form/Form";

import "./Main.css";

class Main extends Component {
  state = {
    movies: [],
    isLoading: false,
    inputFilter: "",
    onload: false,
    moviesWillWatch: [],
    sort: false,
    inputFilterValue: ""
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
        movies: [...this.state.movies, ...loadedFileContentArray],
        onload: true
      });
    };
  };

  handleGetMoviesData = () => {
    this.setState({
      onload: true
    });
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
  getDataFromServer = () => {
    fetch("https://test-server-node-express.herokuapp.com/movies")
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data,
          onload: true
        });
      });
  };

  changeInputFilterValue = e => {
    this.setState({
      inputFilterValue: e.target.value
    });
  };

  addNewMovie = movie => {
    fetch("https://test-server-node-express.herokuapp.com/movies", {
      method: "POST",
      body: JSON.stringify(movie)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: [...this.state.movies, movie]
        });
      });
  };

  render() {
    const { movies } = this.state;
    return (
      <main className="container__main">
        <article className="container__main--form">
          <Form addNewMovie={this.addNewMovie} />
        </article>
        <article className="container__main--inputs" />

        {this.state.onload ? (
          <article className="container__main--moviesList">
            <div className="inputFilter">
              <label>
                <input
                  className="inputFilter__input"
                  type="text"
                  id="inputFilter"
                  name="inputFilter"
                  value={this.state.inputFilterValue}
                  onChange={this.changeInputFilterValue}
                  placeholder="Enter your value"
                />
              </label>
              <div className="wrapper__button">
                <button className="btn sortbutton" onClick={this.sortByAbc}>
                  {this.state.sort ? (
                    <span>&#8593;</span>
                  ) : (
                    <span>&#8595;</span>
                  )}{" "}
                  SORT
                </button>
                <button className="btn" onClick={this.getDataFromServer}>
                  Get Data
                </button>
              </div>
              <p className="movies-willwatch">
                Movies will watch:{" "}
                <b style={{ color: "blue" }}>
                  {this.state.moviesWillWatch.length}
                </b>
              </p>
            </div>

            {movies.map(movie => {
              if (
                movie.title
                  .toLowerCase()
                  .includes(this.state.inputFilterValue.toLowerCase()) ||
                movie.stars
                  .join(",")
                  .toLowerCase()
                  .includes(this.state.inputFilterValue.toLowerCase())
              ) {
                return (
                  <Section
                    key={movie.title}
                    movie={movie}
                    removeItem={this.removeMovieById}
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                  />
                );
              } else {
                return "";
              }
            })}
          </article>
        ) : (
          <article className="container__main--moviesList">
            <h1>
              Choose the correct{" "}
              <span style={{ color: "red" }}>
                <b>*.txt</b>
              </span>{" "}
              file on PC or this project directory{" "}
              <a href="./sample_movies[756].txt" download="sample_movies.txt">
                sample_movies.txt
              </a>{" "}
              and{" "}
              <label className="label_input_file">
                Upload
                <input
                  className="custom-file-input"
                  type="file"
                  id="inputLoader"
                  name="inputLoader"
                  onChange={this.handleInputFileLoader}
                  placeholder="what are we looking for?"
                />
              </label>{" "}
              it! Or click on{" "}
              <span style={{ color: "red" }}>
                <b>
                  <button
                    className="getButton"
                    onClick={this.getDataFromServer}
                  >
                    Get
                  </button>
                </b>
              </span>{" "}
              button and get data from server. (Heroku or LocalServer)
              <p>
                <a
                  title="Heroku server data base link"
                  alt="Heroku"
                  href="https://test-server-node-express.herokuapp.com/movies"
                >
                  Heroku bd
                </a>
              </p>
            </h1>
          </article>
        )}
      </main>
    );
  }
}

export default Main;
