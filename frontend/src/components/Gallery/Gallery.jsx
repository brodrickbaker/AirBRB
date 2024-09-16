import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Gallery.css'

const Gallery = (props) => {

  const {spot} = props
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if(spot) setIsLoaded(true)
  }, [spot]);
    
  return (
    <> 
    {isLoaded &&
      <img src={spot.previewImage}  
        alt={spot.name}
        title={spot.name}
        className="card"
        onClick={()=> navigate(`/spots/${spot.id}`)}
      />}
      <div className='info'>
        <h3>{spot.city}, {spot.state}</h3>
        <h3 id='star'> ⭐{spot.avgRating !== 'NaN'? spot.avgRating : 'New'}</h3>
        <h3>${spot.price}/night</h3>
      </div> 
    </>
  )
};

export default Gallery;
