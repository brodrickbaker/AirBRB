import { getReviews } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import './ShowReview.css'

const months = { 
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

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
            const createdAt = months[review.createdAt.slice(5,7)] + ' ' + review.createdAt.slice(0,4);    
            return (
                <li key={review.id}>
                    <h3>{review.User.firstName}</h3>
                    <h3>{createdAt}</h3>
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
