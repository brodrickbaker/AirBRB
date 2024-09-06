import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './ShowSpot.css'

const ShowSpot = () => {
  const {spotId} = useParams();
  const spot = useSelector(state => state.spot[spotId])

    return (
    <div>
      <h1>{spot.name}</h1>
    </div>
  )
};

export default ShowSpot;
