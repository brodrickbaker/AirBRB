import { useState } from 'react';


import { useModal } from '../../context/Modal';

const CreateReviewModal = (spot) => {

    const [review, setReview] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async res => {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors);
          }
        );
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
          <button type="submit" className='btn'>Submit</button>
        </form>
      </>
    )
  };

export default CreateReviewModal;
