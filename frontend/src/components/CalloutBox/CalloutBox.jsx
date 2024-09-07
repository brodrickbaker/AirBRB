import './Callout.css'

const CalloutBox = (props) => {
    const {spot} = props
    return (
    <div className='card' id='callout-box'>
        <p>${spot.price}/night </p><p>⭐{spot.avgStarRating}</p><p> {spot.numReviews} reviews </p>
        <button className="btn" onClick={()=> alert('Feature Coming Soon!')}>Reserve</button>
    </div>
  )
};

export default CalloutBox;
