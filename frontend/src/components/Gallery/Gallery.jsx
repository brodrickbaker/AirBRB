import { useNavigate } from 'react-router-dom';
import './Gallery.css'

const Gallery = (props) => {

  const {spot} = props
  const navigate = useNavigate()
    
  return (
    <> {spot &&
              <img src={spot.previewImage || 'https://i.ibb.co/bXxJtS9/9009180.png' }  
              alt={spot.name}
              title={spot.name}
              className="card"
              onClick={()=> navigate(`/spots/${spot.id}`)}
              />}
            <div className='info'>
              <h3>{spot.city}, {spot.state}</h3>
              <h3 id='star'> ⭐{spot.avgRating !== 'NaN'? spot.avgRating : 'New'} </h3>
              <h3>${spot.price}/night</h3>
            </div> 
      </>
  )
};

export default Gallery;
