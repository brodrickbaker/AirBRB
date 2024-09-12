import Gallery from "../Gallery";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserSpots = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    if (!user) {   
        navigate("/");
      }
    const allSpots = useSelector(state => state.spot.spots);
    const userSpots = Object.values(allSpots).filter(spot => spot.ownerId == user.id);
    
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
              <button className="btn">Update</button>
              <button className="btn">Delete</button>
            </div>
          </li>
          )}
          )}</ul>
          </div>
      </>
  )
};

export default UserSpots;
