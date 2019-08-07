import React, { Component } from "react";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Section from "./Section/Section";
import Form from "./Form/Form";

import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      inputFilter: "",
      onload: false,
      moviesWillWatch: [],
      sort: false,
      inputFilterValue: "",
      formatValid: true,
      error: null,
      fileType: ""
    };
  }

  handleInputFileLoader = e => {
    let file = e.target.files[0];
    let reader = new FileReader();

    if (file.type !== "text/plain") {
      // проверка на тип файла отличающегося от txt
      this.setState({ error: "Wrong file type" });
      return;
    }

    reader.readAsText(file);

    reader.onload = () => {
      try {
        let loadedFileContentArray = reader.result
          .split("\n\n")
          .filter(Boolean)
          .map(item => {
            const [title, year, format, stars] = item.split("\n");

            const splitTrimFunc = value => value.split(":")[1].trim();
            const getUniqueId = () => {
              const date = new Date();

              return date.getTime() + Math.random();
            };

            if (
              splitTrimFunc(format) === "DVD" ||
              splitTrimFunc(format) === "VHS" ||
              splitTrimFunc(format) === "Blu-Ray"
            ) {
              return {
                title: splitTrimFunc(title),
                year: splitTrimFunc(year),
                format: splitTrimFunc(format),
                stars: splitTrimFunc(stars)
                  .split(",")
                  .map(item => item.trim()),
                movieId: getUniqueId()
              };
            } else {
              return this.setState({
                formatValid: false,
                error: "Wrong format"
              });
            }
          });

        if (this.state.formatValid === false && this.state.error) {
          return;
        }

        this.setState({
          movies: [...this.state.movies, ...loadedFileContentArray],
          onload: true,
          formatValid: true
        });

        // fetch("http://127.0.0.1:5050/movies", {                // Отправка загруженого контента на сервер с подальшем его сохранением в базе.
        //   method: "POST",
        //   mode: "no-cors",
        //   body: JSON.stringify(loadedFileContentArray)
        // });
      } catch (error) {
        this.setState({ error });
      }
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

    if (!this.state.sort) {
      moviesSort.sort((a, b) => a.title.toLowerCase().localeCompare(b.title));
    } else {
      moviesSort.sort((a, b) => b.title.toLowerCase().localeCompare(a.title));
    }

    this.setState({
      movies: moviesSort,
      sort: !this.state.sort
    });
  };
  getDataFromServer = () => {
    fetch("http://127.0.0.1:5050/movies/")
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: [...this.state.movies, ...data],
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
    fetch("http://127.0.0.1:5050/movies", {
      method: "POST",
      body: JSON.stringify(movie)
    });

    this.setState({
      movies: [...this.state.movies, movie],
      onload: true
    });
  };

  // removeMovieByIdFromServer = id => {
  //   confirmAlert({
  //     title: "Confirm to detete from server",
  //     message: "Are you sure to do this.",
  //     buttons: [
  //       {
  //         label: "Yes",
  //         onClick: () => {
  //           this.removeMovieById(id);
  //           fetch("http://127.0.0.1:5050/movies/delete", {
  //             method: "POST",
  //             mode: "no-cors",
  //             headers: {
  //               "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify(id)
  //           });
  //         }
  //       },
  //       {
  //         label: "No",
  //         onClick: () => null
  //       }
  //     ]
  //   });
  // };

  render() {
    const { movies, error, formatValid } = this.state;
    const inlineErrorStyle = {
      color: "red"
    };
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
                <label className="label_input_file file">
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
            {!error ? (
              ""
            ) : (
              <>
                <h1 style={inlineErrorStyle}>
                  Sorry, wrong {formatValid ? <b>FILE</b> : <b>FORMAT</b>}!
                </h1>
                <span style={inlineErrorStyle}>
                  Choose the corret {formatValid ? <b>FILE</b> : <b>FORMAT</b>},
                  please.
                </span>
              </>
            )}
            <h1>
              Choose the correct{" "}
              <span style={{ color: "red" }}>
                <b>*.txt</b>
              </span>{" "}
              file on PC or this project directory named sample_movies[756] and{" "}
              <label className="label_input_file">
                Upload
                <input
                  className="custom-file-input"
                  type="file"
                  id="inputLoader"
                  name="inputLoader"
                  onChange={this.handleInputFileLoader}
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
