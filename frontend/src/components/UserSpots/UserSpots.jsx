import Gallery from "../Gallery";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSpots, getOneSpot } from "../../store/spot";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

const UserSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserSpots());
    }, [dispatch])

    const userSpots = useSelector(state => state.spot.spots);

    const newFirst = []
  
    for (let i = Object.values(userSpots).length - 1; i >= 0; i--) {
        newFirst.push(Object.values(userSpots)[i])
    }

    const handleUpdate = (spot) => async (e) => {
      e.preventDefault()
      await dispatch(getOneSpot(spot.id)).then(()=> navigate(`/spots/${spot.id}/update`))
    }
    return (
      <>
      <h1>Your Spots</h1>
      {newFirst.length?
          <div className='gallery'>
          <ul className='card'>{newFirst.map(spot => {
          return (
          <li key={spot.id}>
            <Gallery spot={spot}/>
            <div className="buttons">
              <button
              onClick={handleUpdate(spot)} 
              className="btn">Update Spot</button>
              <button className="btn">
                <OpenModalButton
                  buttonText="Delete Spot"
                  modalComponent={<ConfirmDeleteModal itemString={'spot'} item={spot} />}
                  />
                  </button>
            </div>
          </li>
          )}
          )}</ul>
          </div>: 
          <button className="btn" onClick={()=> navigate('/spots/new')}>Create a New Spot</button>}
      </>
  )
};

export default UserSpots;
