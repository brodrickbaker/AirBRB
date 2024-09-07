import { getReviews } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './ShowReview.css'


const ShowReviews = (props) => {
    const {spot} = props
    const {spotId} = useParams();
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.spot.reviews)
    
    useEffect(() => {
      dispatch(getReviews(spotId))
    }, [dispatch, spotId])
  
  return (
    <div>
        <h2>⭐ {spot.avgStarRating} • {spot.numReviews} Reviews</h2>
         <ul className="card review">{reviews.map(review => {
            return (
                <li key={review.id}>
                    <h3>{review.User.firstName}</h3>
                    <h3>{review.createdAt}</h3>
                    <p>{review.review}</p>
                </li>
            )
         }
         )}
        
        </ul>
      
    </div>
  )
};

export default ShowReviews;
