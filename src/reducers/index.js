import { combineReducers } from 'redux';

const switching = (state = 'filling', action) => {
  switch (action.type) {
    case 'FILLING':
      return action.payload.submittingState;
    case 'OPEN_REGISTRATION_FORM':
      return action.payload.submittingState;
    case 'OPEN_INPUT_FORM':
      return action.payload.submittingState;
    default:
      return state;
  }
};


export default combineReducers({
  switching,
});
