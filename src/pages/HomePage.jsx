import React, { useState, useEffect } from "react";
import { API_URL, API_KEY } from "API/API";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviesList from "components/MoviesList/MoviesList";
import styles from '../Styles.module.css'

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMoviesFetched, setMoviesFetched] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
      
            setLoading(true);
        
            try {
                const response = await axios.get(`${API_URL}trending/movie/week?language=en-US`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        accept: 'application/json',
                    },
                });
                if (response.length === 0) {
                    throw toast.error(`No results.`);
                }
                
                setMovies(response.data.results);
                setMoviesFetched(true);
            
            } catch(error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (!isMoviesFetched) {
            fetchMovies();
        }

    }, [isMoviesFetched]);

    return (
        
        <div className={styles.content}>
            <h1>Home Page</h1>

            <MoviesList movies={movies}/>

            {loading && <Loader />}

            <ToastContainer autoClose={5000} theme="dark"/>
        </div>
    )
}

export default HomePage;