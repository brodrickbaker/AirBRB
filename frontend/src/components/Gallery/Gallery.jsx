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
    <>
    <h1>Welcome!</h1>
    <div className='gallery'>
      <ul className='card'>{Object.values(allSpots).map(spot => {
        return (
          <li key={spot.id}>
            <NavLink to={`spots/${spot.id}`}>
              <img src={spot.previewImage}  
              alt={spot.name}
              title={spot.name}
              className="card"
              />
            </NavLink>
            <span className='info'>
              <h3>{spot.city}, {spot.state}</h3>
              <h3> ⭐{spot.avgRating} </h3>
              <h3><br/>${spot.price}/night</h3>
            </span>
          </li>  
        )}
      )}</ul>
    </div>
      </>
  )
};

export default Gallery;
