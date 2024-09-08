import { sOrNah } from "../../store/spot";

const CalloutBox = (props) => {
    const {spot} = props
    return (
    <div className='card' id='callout-box'>
        <h3>${spot.price}/night </h3><h3>⭐{spot.avgStarRating !== 'NaN'? spot.avgStarRating : 'New' }</h3><h3> {spot.numReviews} {sOrNah(spot.numReviews)} </h3>
        <button className="btn" onClick={()=> alert('Feature Coming Soon!')}>Reserve</button>
    </div>
  )
};

export default CalloutBox;
