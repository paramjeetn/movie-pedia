import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import "./App.css";

const API_URL = `http://www.omdbapi.com?apikey=32c0e685`;
const movie1 = {
    "Title": "Lois & Clark: The New Adventures of Superman",
    "Year": "1993",
    "imdbID": "tt0106057",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGFjNzEtZWYzZC00ZmI0LTg2NmMtN2YyNTY4YzhlODIyXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg"
}
const App = () => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        searchMovies(`${searchTerm}`);
        }
      };
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm]=useState(``);
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies(`English`);
    }, []);
    return (

        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <div onKeyDown={() => searchMovies(`${searchTerm}`)}> 

                </div>
                <input placeholder='Search for movies' value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />

                
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" className='image' onClick={() => searchMovies(`${searchTerm}`)}>
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                

            </div>
            {
                movies.length > 0
                    ? (


                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>


                    ) :
                    (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>


    );
}

export default App;