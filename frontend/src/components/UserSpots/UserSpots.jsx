import Gallery from "../Gallery";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dropSpot, getSpots } from "../../store/spot";
import { useEffect } from "react";

const UserSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    if (!user) {   
        navigate("/");
      }
    const allSpots = useSelector(state => state.spot.spots);
    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId == user.id);
    useEffect(() => {
      dispatch(getSpots())
    }, [dispatch])
    
    const handleSubmit = async (spot) => {
      await dispatch(dropSpot(spot.id)) 
    } 
    return (
      <>
      {userSpots && 
      <h1>Your Spots</h1>}
          <div className='gallery'>
          <ul className='card'>{userSpots.map(spot => {
          return (
          <li key={spot.id}>
            <Gallery spot={spot}/>
            <div className="buttons">
              <button
              onClick={() => navigate('/spots/new')} 
              className="btn"
              >Update</button>
              <button 
              className="btn"
              onClick={() => handleSubmit(spot)}
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
