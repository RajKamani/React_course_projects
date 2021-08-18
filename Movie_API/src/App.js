import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const fetchMovie = () => {
    setIsLoading(true);
    setErr(null);
    fetch("https://swapi.dev/api/films/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const myFormate = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        });
        setMovies(myFormate);
      })
      .catch((error) => {
        setErr(true);
      });
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !err && <h3>No movies Found.</h3>}
        {err && <h3>Something went wrong.</h3>}
        {isLoading && <h3>Loading...</h3>}
      </section>
    </React.Fragment>
  );
}

export default App;
