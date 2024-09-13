import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const GET_SPOT = 'spots/GET_SPOT'
const GET_REVIEWS = 'spots/GET_REVIEWS'
const DELETE_SPOT = 'spots/DELETE_SPOT'
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

const deleteSpot = id => ({
  type: DELETE_SPOT,
  id
})

const fetchReviews = reviews => ({
    type: GET_REVIEWS,
    reviews
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
    const {country, address, city, state, lat, lng, description, name, price, images} = spot
    const res = await csrfFetch('/api/spots/',
      {
        method: 'POST',
        body: JSON.stringify({country, address, city, state, lat, lng, description, name, price})
      }).catch(async res => await res.json())
      let newSpot = await res.json();
      if (res.ok) {       
        const newRes = await fetch(`/api/spots/${newSpot.id}`)
        newSpot = await newRes.json();
        dispatch(getSpot(newSpot));
        for await (let image of images){
          if(image.url){
          csrfFetch(`/api/spots/${newSpot.id}/images`, {
              method: 'POST',
              body: JSON.stringify({ ...image})
          })
      }}}
      return newSpot;
  }

  export const dropSpot = id => async dispatch => {
    await csrfFetch(`/api/spots/${id}`,
      {
        method: 'DELETE'
      }
    ).catch(res => res.json())
    dispatch(deleteSpot(id))
  }

  export const addReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${review.spotId}/reviews`,
      {
        method: 'POST',
        body: JSON.stringify(review)
      })
      const newReview = await res.json()
      dispatch(postReview(newReview));
      return res; 
  }



const initialState = {
    spots: {},
    spot: null,
    reviews: [],
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
        case DELETE_SPOT: {
          const newState = {...state}
          newState.spot = null
          delete newState.spots[action.id]
          return newState
        }
        case GET_REVIEWS: {
          const newState = { ...state}
          newState.reviews = action.reviews  
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
