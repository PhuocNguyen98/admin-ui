import { GET_POST, ADD_POST, EDIT_POST, DELETE_POST } from '../actionsType';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return { ...state, data: action.payload, isLoading: false };
    case ADD_POST:
      return;
    case EDIT_POST: {
      const newState = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return Object.assign(item, action.payload);
        }
        return item;
      });
      return { ...state, data: newState, isLoading: false };
    }

    case DELETE_POST:
      return;
    default:
      return state;
  }
};

export default postReducer;
