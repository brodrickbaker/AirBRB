import { getReviews } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sOrNah } from "../../store/spot";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";

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
    const {spot} = props;
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.spot.reviews);
    const user = useSelector(state => state.session.user);
    const [reviewed, setReviewed] = useState(false)
    
    useEffect(() => {
      dispatch(getReviews(spotId))
      setReviewed(reviews.find(review => user?.id == review.userId))
    }, [dispatch])

if(reviews.length){
  return (   
    <div>
        <h2>{' ⭐ ' + spot.avgStarRating  + '  •  ' + spot.numReviews + ' ' + sOrNah(reviews.length)}&nbsp;&nbsp;
            {!reviewed && user &&
            <button className="btn">
                <OpenModalButton
                buttonText="Write a Review"
                modalComponent={<CreateReviewModal spot={spot} user={user}/>}
              /></button>}</h2>
         <ul className="card" id="review">{reviews.map(review => {       
            const createdAt = months[review.createdAt.slice(5,7)] + ' ' + review.createdAt.slice(0,4);    
            return (
                <li key={review.id}>
                    <h3>{review.User?.firstName}</h3>
                    <h3>{createdAt}</h3>
                    <p>{review.review}</p>
                </li>
                )}
            )}
        </ul>
    </div>
  )
} else if(!reviews.length && user && user.id !== spot.ownerId)  {
    return (
    <>
        <h2>⭐ 0.0&nbsp;&nbsp;{!reviewed && 
            <button className="btn">
                <OpenModalButton
                buttonText="Write a Review"
                modalComponent={<CreateReviewModal spot={spot} user={user} />}
              /></button>}</h2>
        <div className="card">
            <h3>Be the first tor write a review</h3>
        </div>
    </>
)} else {
    return (
        <>
            <h2>⭐ 0.0</h2>
            <div className="card">
                <h3>No Reviews Yet</h3>
            </div>
        </>
    )
}
} 


export default ShowReviews;
