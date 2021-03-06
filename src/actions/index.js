export const filling = () => ({
  type: 'FILLING',
  payload: {
    submittingState: 'filling',
  },
});

export const openRegistrationForm = () => ({
  type: 'OPEN_REGISTRATION_FORM',
  payload: {
    submittingState: 'openRegistrationForm',
  },
});

export const openInputForm = () => ({
  type: 'OPEN_INPUT_FORM',
  payload: {
    submittingState: 'openInputForm',
  },
});

export const addUser = (email, speciality) => ({
  type: 'ADD_USER',
  payload: {
    email,
    speciality,
  },
});

export const logOut = () => ({ type: 'LOGOUT' });
