import Gallery from "../Gallery";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dropSpot, getSpots, getOneSpot } from "../../store/spot";
import { useEffect, useState } from "react";

const UserSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const [spots, setSpots] = useState(0); 

    useEffect(() => {
      dispatch(getSpots());
    }, [dispatch])

    const allSpots = useSelector(state => state.spot.spots);
    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId == user.id);

    const newFirst = []
  
    for (let i = Object.values(userSpots).length - 1; i >= 0; i--) {
        newFirst.push(Object.values(userSpots)[i])
    }

    const handleDelete = async (spot) => {
     if(confirm('Are you sure you want to delete?')){
      await dispatch(dropSpot(spot.id)).then(()=> dispatch(getSpots())) 
      setSpots(userSpots.length)
      }
      
    } 

    const handleUpdate = async (spot) => {
      await dispatch(getOneSpot(spot.id)).then(()=> navigate(`/spots/${spot.id}/update`))
    }
    return (
      <>
      {userSpots && 
      <h1>Your Spots</h1>}
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
          </div>
      </>
  )
};

export default UserSpots;
