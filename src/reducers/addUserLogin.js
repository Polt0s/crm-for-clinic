const initState = {
  currentUser: {},
  isAuth: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        currentUser: { email: action.payload.email, speciality: action.payload.speciality },
        isAuth: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };
    default:
      return state;
  }
};

export default userReducer;
