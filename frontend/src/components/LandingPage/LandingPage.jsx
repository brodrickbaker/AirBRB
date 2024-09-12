import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useEffect } from 'react';
import Gallery from '../Gallery';

const LandingPage = () => {
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
      {allSpots && 
      <h1>Welcome!</h1>}
          <div className='gallery'>
          <ul className='card'>{newFirst.map(spot => {
          return (
          <li key={spot.id}>
            <Gallery spot={spot}/>
          </li>
          )}
          )}</ul>
          </div>
      </>
      )
};

export default LandingPage;