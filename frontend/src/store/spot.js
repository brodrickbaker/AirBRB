
const LOAD = 'spots/LOAD';

const load = spots => ({
    type: LOAD,
    spots
  });

  export const getSpots = () => async dispatch => {
    const res = await fetch(`/api/spots`);
    if (res.ok) {
      const list = await res.json();
      dispatch(load(list.Spots));
    }
  };
  
//   export const getOneSpot = id => async () => {
//     const res = await fetch(`/api/spots/${id}`);
//     if (res.ok) {
//       const spot = await res.json();
//       return spot
//     }
//   }

const spotReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
          const newState = {};
          action.spots.forEach(spot => {
            newState[spot.id] = spot;
          });
          return newState;
        }
          default:
            return state 
        }
};

export default spotReducer;
