import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from 'components/MoviesList/MoviesList.module.css'

const MoviesList = ( { movies }) => {
    const location = useLocation();
    return(
        <ul className={styles.movies_list}>
            {movies.map(movie => (
                <li key={movie.id} className={styles.list_item}>
                    <Link 
                        to={`/movie/${movie.id}`}
                        state={{ from: location }}
                    >
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default MoviesList;