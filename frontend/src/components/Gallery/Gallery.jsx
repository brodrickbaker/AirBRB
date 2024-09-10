import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Gallery.css'

const Gallery = () => {
  
  const allSpots = useSelector(state => state.spot.spots);
  const dispatch = useDispatch();

  const newFirst = []

  for (let i = Object.values(allSpots).length - 1; i >= 0; i--) {
      newFirst.push(Object.values(allSpots)[i])
  }

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])
  
    return (
    <>
    <h1>Welcome!</h1>
    <div className='gallery'>
      <ul className='card'>{newFirst.map(spot => {
        return (
          <li key={spot.id}>
            <NavLink to={`spots/${spot.id}`}>
              <img src={spot.previewImage || 'https://i.ibb.co/bXxJtS9/9009180.png' }  
              alt={spot.name}
              title={spot.name}
              className="card"
              />
            </NavLink>
            <div className='info'>
              <h3>{spot.city}, {spot.state}</h3>
              <h3 id='star'> ⭐{spot.avgRating !== 'NaN'? spot.avgRating : 'New'} </h3>
              <h3>${spot.price}/night</h3>
            </div>
          </li>  
        )}
      )}</ul>
    </div>
      </>
  )
};

export default Gallery;
