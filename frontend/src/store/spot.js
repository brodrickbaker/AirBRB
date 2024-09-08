const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const GET_SPOT = 'spots/GET_SPOT'
const GET_REVIEWS = 'spots/GET_REVIEWS'

export const sOrNah = reviews => reviews.length !== 1 || reviews !== 1 ? 'Reviews' : 'Review';

const loadSpots = spots => ({
    type: LOAD_SPOTS,
    spots
  });

const getSpot = spot => ({
    type: GET_SPOT,
    spot
})

const fetchReviews = reviews => ({
    type: GET_REVIEWS,
    reviews
})

  export const getSpots = () => async dispatch => {
    const res = await fetch(`/api/spots`);
    if (res.ok) {
      const list = await res.json();
      dispatch(loadSpots(list.Spots));
    }
  };
  
  export const getOneSpot = id => async dispatch => {
    const res = await fetch(`/api/spots/${id}`);
    if (res.ok) {
      const spot = await res.json();
      dispatch(getSpot(spot));
    }
  }

  export const getReviews = id => async dispatch => {
    const res = await fetch(`/api/spots/${id}/reviews`);
    if (res.ok) {
        const reviews = await res.json()
        dispatch(fetchReviews(reviews.Reviews))
    }
  }

const initialState = {
    spots: {},
    spot: null,
    reviews: []
} 

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
          const newState = {...state};
          action.spots.forEach(spot => {
            newState.spots[spot.id] = spot;
          });
          return newState;
        }
        case GET_SPOT: {
            const newState = {...state}
            newState.spot = action.spot
            return newState
        }
        case GET_REVIEWS: {
            return {
                ...state,
                spots: {...state.spots},
                spot: state.spot || null,
                reviews: action.reviews
            }
        }
          default:
            return state 
        }
};

export default spotReducer;
