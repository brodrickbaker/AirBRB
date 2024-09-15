import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { dropReview, getOneSpot, getReviews, dropSpot, getUserSpots } from '../../store/spot';

const ConfirmDeleteModal = (props) => {
    const dispatch = useDispatch();
    const { closeModal }= useModal();
    const {item, itemString} = props;

    const handleDelete = id => {
        if (itemString == 'review') {
            return dispatch(dropReview(id))
            .then(() => dispatch(getReviews(item.spotId))
            .then(() => dispatch(getOneSpot(item.spotId))))
            .then(closeModal); 
        } else {
            return dispatch(dropSpot(id))
            .then(() => dispatch(getUserSpots()))
            .then(closeModal)
        }
    }

    return (
        <div className='alert'>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this {itemString}?</h3>
            <button className='btn' onClick={() => handleDelete(item.id)}>Yes (Delete {itemString})</button>
            <button className='btn close-modal' onClick={closeModal}>No (Keep {itemString})</button>
        </div>
    )
}

export default ConfirmDeleteModal;