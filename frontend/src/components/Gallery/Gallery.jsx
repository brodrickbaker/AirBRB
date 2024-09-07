import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Gallery.css'

const Gallery = () => {
  
  const allSpots = useSelector(state => state.spot.spots);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])
  
    return (
    <div >
      <h1>Welcome!</h1>
      <ul className='gallery card'>{Object.values(allSpots).map(spot => {
        return (
          <li key={spot.id}>
            <NavLink to={`spots/${spot.id}`}>
              <img src={spot.previewImage}  
              alt={spot.name}
              title={spot.name}
              className="card"
              />
            </NavLink>
            <div className='info'>
              <h3>{spot.city}, {spot.state}</h3>
              <h3> ⭐{spot.avgRating} </h3>
              <h3><br/>${spot.price}/night</h3>
            </div>
          </li>  
        )}
      )}</ul>
    </div>
  )
};

export default Gallery;
