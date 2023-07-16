import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY } from "API/API";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from 'pages/Styles.module.css'

const ReviewsPage = () => {
  const { movieId } = useParams();
  const [reviewsDetails, setReviewsDetails] = useState(null);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    const fetchMovieData = async () => {

        if(!movieId) return;

        setLoading(true);

        try {
            const response = await axios.get(`${API_URL}movie/${movieId}/reviews`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    accept: 'application/json',
                },
            });
            if (response.length === 0) {
            throw toast.error(`No results.`);
            }

            setReviewsDetails(response.data);

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
      {reviewsDetails !== null &&
        <div>
            {reviewsDetails.results.length === 0 ? (
                <p>There are no reviews available for this movie.</p>
            ) : (
                <ul className={styles.reviews_list}>
                    {reviewsDetails.results
                    .map(review => {
                        return <li key={review.id} className={styles.list_item}>
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>
                        </li>
                    })}
                </ul>
            )}

            {loading && <Loader />}

            <ToastContainer autoClose={5000} theme="dark"/>
        </div>
      }   
    </div>
  )
}

export default ReviewsPage;
