import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const GET_SPOT = 'spots/GET_SPOT'
const GET_REVIEWS = 'spots/GET_REVIEWS'
const POST_SPOT = 'spots/POST_SPOT'
const POST_PIC = 'spots/POST_PIC'
const POST_REVIEW = 'spots/POST_REVIEW'

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

const postPic = pic => ({
  type: POST_PIC,
  pic
})

const postReview = review => ({
  type: POST_REVIEW,
  review
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

  export const addPic = (spot, pic) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}/images`,
      {
        method: 'POST',
        body: JSON.stringify(pic)
      }).catch(async res => await res.json())
      if (res.ok) {
        const newPic = await res.json();
        dispatch(postPic(newPic));
      }
      return res; 
  }

  export const addReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`,
      {
        method: 'POST',
        body: JSON.stringify(review)
      })
      console.log(res)
      const newReview = await res.json();
      dispatch(postReview(newReview));
      return res; 
  }



const initialState = {
    spots: {},
    spot: null,
    reviews: [],
    images: []
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
        case POST_PIC: {
          const newState = {...state}
          newState.images = [...newState.images, action.pic]
          return newState
        }
        case POST_REVIEW: {
          const newState = {...state}
          newState.reviews = [...newState.reviews, action.review]
          return newState
        }
          default:
            return state 
        }
};

export default spotReducer;
