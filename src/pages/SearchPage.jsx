import React, { useState, useEffect } from "react";
import { API_URL, API_KEY } from "API/API";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import MoviesList from "components/MoviesList/MoviesList";
import { useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Styles.module.css'

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('query');

    const hendleSubmit = (evt) => {
        evt.preventDefault();
        const searchValue = evt.target.children.search.value.toLowerCase();
        if(searchValue.trim() === '') {
            toast.error('Write key word for search images!')
            return;
        }
        setSearchParams({
            query: searchValue,
        });
    };
  
    useEffect(() => {
      const fetchMovies = async () => {
        if (!searchTerm) return;

        setLoading(true);
  
        try {
          const response = await axios.get(`${API_URL}search/movie`, {
            params: { query: searchTerm },
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: 'application/json',
            },
          });
  
          if (response.data.results.length === 0) {
            throw new Error(`No results for "${searchTerm}".`);
          }
  
          setMovies(response.data.results);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, [searchTerm]);

    return (
      <div className={styles.search_page}>
        <h1>Search Page</h1>
        <form onSubmit={hendleSubmit}>
            <input
            type="text"
            name="search"
            placeholder="Enter movie..."
            required
            />
            <button type="submit">Search</button>
        </form>
        
        {searchTerm !== null && <MoviesList movies={movies} />}
  
        {loading && <Loader />}
  
        <ToastContainer autoClose={5000} theme="dark" />
      </div>
    );
};

export default SearchPage;