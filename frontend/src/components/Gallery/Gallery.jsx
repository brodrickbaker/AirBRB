import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useEffect } from 'react';

const Gallery = () => {
  
  const allSpots = useSelector(state => state.spot);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots())
  }, [dispatch])
  
  console.log(allSpots)
    return (
    <div >
      <h1>Welcome!</h1>
      <div>{Object.values(allSpots).map(spot => {
        return (
          <img src={spot.previewImage} 
          key={spot.id} 
          alt={spot.name}
          className="card"
          />
        )}
      )}</div>
    </div>
  )
};

export default Gallery;
