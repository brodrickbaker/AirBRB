import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot } from "../../store/spot";
import './ShowSpot.css'
import CalloutBox from "../CalloutBox";
import ShowReviews from "../ShowReviews";

const ShowSpot = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spot.spot)
  
  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch, spotId])

    return (
    <div>
      <h1>{spot.name}</h1>
      <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      <img src={spot.SpotImages.find(image => image.preview).url}></img>
      <div className="sub">
        <h3>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h3>
        <CalloutBox spot={spot} />
      </div>
      <p>{spot.description}</p>
      <ShowReviews spot={spot}/>
    </div>
  )
};

export default ShowSpot;
