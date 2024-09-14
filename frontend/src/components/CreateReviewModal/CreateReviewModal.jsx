import { useState } from 'react';
import { addReview } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getReviews, getOneSpot } from '../../store/spot';

const CreateReviewModal = (props) => {
    const {spot, user} = props
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(5)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const dispatch = useDispatch()  

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            spotId: spot.id,
            userId: user.id,
            review,
            stars
        }
        return dispatch(addReview(payload)).then(() => dispatch(getOneSpot(spot.id))).then(() => dispatch(getReviews(spot.id)))
        .then(closeModal())
        .catch(async res => {
            const data = await res.json();
            if (data?.message) setErrors(data.message);
          }
        );
        
    };   

    const disabled = (review.length < 10)? 'disabled' : ''
    return (
        <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}>
          <label name='review'>
            <textarea
              value={review}
              placeholder='Just a quick review'
              onChange={(e) => setReview(e.target.value)}
              rows='10'
              required>
            </textarea>
          </label>
          <label>
            <select 
            name="stars"
            required
            value={stars}
            onChange={e => setStars(e.target.value)} >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
          <button type="submit" className={`btn ${disabled}`} disabled={disabled} >Submit</button>
          {errors && <span>{errors.message}</span>}
          </label>
        </form>
      </>
    )
  };

export default CreateReviewModal;
