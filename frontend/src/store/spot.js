
const LOAD = 'spots/LOAD';

const load = spots => ({
    type: LOAD,
    spots
  });

  export const getSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if (response.ok) {
      const list = await response.json();
      dispatch(load(list.Spots));
    }
  };
  

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
