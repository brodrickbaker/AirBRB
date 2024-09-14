import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot, getReviews } from "../../store/spot";
import './ShowSpot.css'
import CalloutBox from "../CalloutBox";
import ShowReviews from "./ShowReviews";
import SpotImages from "../SpotImages";

const ShowSpot = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spot.spot)
  
  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getReviews(spotId))
  }, [dispatch, spotId])

    return (
      <>
      {spot &&
    <div className="spot">
      <h1>{spot.name}</h1>
      <h2>{spot.city}, {spot.state}, {spot.country}</h2>
      <div className="images">
        <SpotImages spot={spot} />
      </div>
      <div className="sub">
        <h3>Hosted By {spot.Owner.firstName + ' ' + spot.Owner.lastName}</h3>
        <p className="description">{spot.description}</p>
        <CalloutBox spot={spot} />
      </div>
      <ShowReviews spot={spot}/>
    </div>}
    </>
  )
};

export default ShowSpot;
