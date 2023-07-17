import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { NavLink, Route, Routes, Link, useLocation, useParams } from "react-router-dom";
import { API_URL, API_KEY } from "API/API";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Styles.module.css'

const CastPage = lazy(() => import('./CastPage'));
const ReviewsPage = lazy(() => import('./ReviewsPage'));

const MovieDetails = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const backLinkref = useRef(location.state?.from ?? '/');

    useEffect(() => {
        const fetchMovieData = async () => {

            if(!movieId) return;

            setLoading(true);

            try {
                const response = await axios.get(`${API_URL}movie/${movieId}?language=en-US`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        accept: 'application/json',
                    },
                });
                if (response.length === 0) {
                throw toast.error(`No results.`);
                }

                setMovieDetails(response.data);

            } catch(error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieData();

    }, [movieId]);

    return(
        <div>
            <Link to={backLinkref.current} className={styles.back_btn}>Go Back</Link>

            {movieDetails !== null && <div className={styles.movie_details}>

                <div className={styles.movie_content}>
                    <div>
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt={movieDetails.title} />
                    </div>
                    
                    <div>
                        <h2>{movieDetails.title}</h2>

                        <p className="user-score">User Score: {(movieDetails.vote_average).toFixed(1)}</p>

                        <h3>Overview</h3>

                        <p className={styles.movie_overview}>{movieDetails.overview}</p>

                        <h3>Genres</h3>

                        <p>
                            {movieDetails.genres.map(genre => {
                                return genre.name
                            }).join(', ')}
                        </p>
                    </div>           
                </div>     

                <NavLink to="cast">Cast</NavLink>
                <NavLink to="reviews">Reviews</NavLink>


                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="cast" element={<CastPage/>}/>
                        <Route path="reviews" element={<ReviewsPage/>}/>
                    </Routes>
                </Suspense>

                
            </div>}

            {loading && <Loader />}

            <ToastContainer autoClose={5000} theme="dark"/>
        </div>
    )
}

export default MovieDetails;
