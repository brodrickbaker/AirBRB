import Gallery from "../Gallery";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dropSpot, getUserSpots, getOneSpot } from "../../store/spot";
import { useEffect, useState } from "react";

const UserSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [spots, setSpots] = useState(0); 

    useEffect(() => {
      dispatch(getUserSpots());
    }, [dispatch, spots])

    const userSpots = useSelector(state => state.spot.spots);

    const newFirst = []
  
    for (let i = Object.values(userSpots).length - 1; i >= 0; i--) {
        newFirst.push(Object.values(userSpots)[i])
    }

    const handleDelete = async (spot) => {
     if(confirm('Are you sure you want to delete?')){
      await dispatch(dropSpot(spot.id)).then(()=> dispatch(getUserSpots())) 
      setSpots(userSpots.length)
      }
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
              className="btn"
              >Update</button>
              <button 
              className="btn"
              onClick={() => handleDelete(spot)}
              >Delete</button>
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
