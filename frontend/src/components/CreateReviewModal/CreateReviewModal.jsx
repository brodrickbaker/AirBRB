import { useState, useEffect } from 'react';
import { addReview, getReviews } from '../../store/spot';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';

const CreateReviewModal = (props) => {
    const {spot} = props
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(5)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);

    // useEffect(() => {
    //     dispatch(getReviews(spot.id))
    //   })

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            spotId: spot.id,
            userId: user.id,
            review,
            stars
        }
        return dispatch(addReview(payload))
        .then(closeModal)
        // .catch(async res => {
        //     const data = await res.json();
        //     if (data?.errors) setErrors(data.errors);
        //   }
        // );
        
    };
    
    return (
        <>
        <h1>Write a review</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <textarea
              value={review}
              placeholder='Write Your Review'
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
            {/* {errors && <p>{errors}</p>} */}
          <button type="submit" className='btn'>Submit</button>
          </label>
        </form>
      </>
    )
  };

export default CreateReviewModal;
