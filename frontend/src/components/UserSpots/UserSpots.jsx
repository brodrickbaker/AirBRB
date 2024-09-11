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
    <> {userSpots &&
    <div>
        <h1>Your Spots</h1>
      <Gallery spots={userSpots}/>
    </div>}
    </>
  )
};

export default UserSpots;
