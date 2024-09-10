import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const GET_SPOT = 'spots/GET_SPOT'
const GET_REVIEWS = 'spots/GET_REVIEWS'
const POST_SPOT = 'spots/POST_SPOT'

export const sOrNah = reviews => reviews !== 1 ? 'Reviews' : 'Review';

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

const postSpot = spot => ({
  type: POST_SPOT,
  spot
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

  export const createSpot = spot => async dispatch => {
    const res = await csrfFetch('/api/spots/',
      {
        method: 'POST',
        body: JSON.stringify(spot)
      }).catch(async res => await res.json())
      if (res.ok) {
        const newSpot = await res.json();
        dispatch(postSpot(newSpot));
      }
      return res;
  }

  export const addPic = async(spot, pic) => {
    const res = await csrfFetch(`/api/spots/${spot.id}/images`,
      {
        method: 'POST',
        body: JSON.stringify(pic)
      }).catch(async res => await res.json())

      return res; 
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
        case POST_SPOT : {
          const newState = {...state}
          newState.spots[action.spot.id] = action.spot
          newState.spot = action.spot
          return newState
        }
          default:
            return state 
        }
};

export default spotReducer;
