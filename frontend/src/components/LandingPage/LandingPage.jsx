import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spot';
import { useEffect } from 'react';
import Gallery from '../Gallery';

const LandingPage = () => {

    const dispatch = useDispatch();
    let allSpots = useSelector(state => state.spot.spots);
    allSpots = Object.values(allSpots).reverse()
  
    useEffect(() => {
      dispatch(getSpots())
    }, [dispatch])
    
      return (
      <>
      {allSpots && 
      <h1>Welcome to airBRB!</h1>}
        <div className='gallery'>
          <ul className='card'>{allSpots.map(spot => {
          return (
            <li key={spot.id}>
              <Gallery spot={spot}/>
            </li>
          )})}
          </ul>
        </div>
      </>
      )
};

export default LandingPage;
