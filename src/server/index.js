const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

let movies = [];
readMovies();

function readMovies() {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return;
    }

    movies = JSON.parse(data);
  });
}

function writeMovies() {
  fs.writeFile("./db.json", JSON.stringify(movies), function(err) {
    if (err) {
      return;
    }
    console.log("Saved!");
  });
}

app.use(bodyParser.text());

app.get("/", (req, res) =>
  res.send(`<h1>Hello from Github and Heroku</h1>
<p>Add to address => <b style="color:red;">/movies</b> , and you can see db of this server</p>

`)
);
app.get("/movies", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(movies);
});

app.post("/movies", (req, res) => {
  const newMovie = JSON.parse(req.body);
  movies.push(newMovie);
  writeMovies();

  res.set("Access-Control-Allow-Origin", "*");
  res.json(movies);
});

app.post("/movies", (req, res) => {
  fs.readFile("./db.json", "utf8", function(err, data) {
    if (err) {
      return;
    }

    movies = JSON.parse(data);
    const newMovie = JSON.parse(req.body);
    movies.push(newMovie);

    fs.writeFile("./db.json", JSON.stringify(movies), function(err) {
      if (err) {
        return;
      }

      res.set("Access-Control-Allow-Origin", "*");
      res.json(movies);
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening on http://127.0.0.1:${port} !`)
);
