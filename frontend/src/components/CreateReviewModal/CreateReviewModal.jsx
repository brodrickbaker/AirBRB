import { useState } from 'react';
import { addReview } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { getReviews, getOneSpot } from '../../store/spot';
import './CreateReview.css'

const CreateReviewModal = (props) => {
    const {spot, user} = props
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0)
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

    let stars1 = ''
    let stars2 = ''
    let stars3 = ''
    let stars4 = ''
    let stars5 = ''


    switch (stars) {
      case 1: {
        stars1 ='stars1'
        console.log(stars)
        break;
      }
      case 2: {
        stars1 ='stars1'
        stars2 ='stars2'
        break;
      }
      case 3: {
        stars1 ='stars1'
        stars2 ='stars2'
        stars3 ='stars3'
        break;
      }
      case 4: {
        stars1 ='stars1'
        stars2 ='stars2'
        stars3 ='stars3'
        stars4 ='stars4'
        break;
      }
      case 5: {
        stars1 ='stars1'
        stars2 ='stars2'
        stars3 ='stars3'
        stars4 ='stars4'
        stars5 ='stars5'
        break;
      }
      default:
        stars1 =''
        stars2 =''
        stars3 =''
        stars4 =''
        stars5 =''
    }

    const disabled = (review.length < 10 || stars == 0)? 'disabled' : ''
    return (
        <>
        <h1>How was your stay?</h1>
        <form onSubmit={handleSubmit}
        className='review'>
          <label name='review'>
            <textarea
              value={review}
              placeholder='Just a quick review'
              onChange={(e) => setReview(e.target.value)}
              rows='8'
              cols='40'
              required>
            </textarea>
          </label>
            <div className="card stars">
            <br />
            <span onClick={() => setStars(1)}
              className={`star ${stars1}`}>★
            </span>
            <span onClick={() => setStars(2)}
              className={`star ${stars2}`}>★
            </span>
            <span onClick={() => setStars(3)}
              className={`star ${stars3}`}>★
            </span>
            <span onClick={() => setStars(4)}
              className={`star ${stars4}`}>★
            </span>
            <span onClick={() => setStars(5)}
              className={`star ${stars5}`}>★
            </span>
            <span>&nbsp;&nbsp;Stars</span>
          </div>
          <label>
          <button type="submit" className={`btn ${disabled}`} disabled={disabled} >Submit</button>
          {errors && <span>{errors.message}</span>}
          </label>
        </form>
      </>
    )
  };

export default CreateReviewModal;
