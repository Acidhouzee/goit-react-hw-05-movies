import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from "API/API";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from '../Styles.module.css'

const CastPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchMovieData = async () => {

          if(!movieId) return;

          setLoading(true);

          try {
              const response = await axios.get(`${API_URL}movie/${movieId}/credits?language=en-US`, {
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
  
  return (
    <div>
      {movieDetails !== null &&

      <div>

        <ul className={styles.actors_list}>
          {movieDetails.cast
          .slice(0, 10)
          .map(actor => {
            return <li key={actor.id} className={styles.list_item}>
              <img className={styles.movie_poster} src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              <h3>{actor.name}</h3>
              <p>{actor.character}</p>
            </li>
          })}

        </ul>


        {loading && <Loader />}

        <ToastContainer autoClose={5000} theme="dark"/>
      </div>}
    </div>
  )
}

export default CastPage;
