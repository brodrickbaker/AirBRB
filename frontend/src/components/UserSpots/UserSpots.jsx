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

    let userSpots = useSelector(state => state.spot.spots);
    userSpots = Object.values(userSpots).reverse()

    const handleUpdate = (spot) => async (e) => {
      e.preventDefault()
      await dispatch(getOneSpot(spot.id)).then(()=> navigate(`/spots/${spot.id}/update`))
    }
    return (
      <>
      <h1>Your Spots</h1>
      {userSpots.length?
        <div className='gallery'>
        <ul className='card'>{userSpots.map(spot => {
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
        )}
        </ul>
        </div> : 
        <button className="btn" onClick={()=> navigate('/spots/new')}>Create a New Spot</button>}
      </>
  )
};

export default UserSpots;
