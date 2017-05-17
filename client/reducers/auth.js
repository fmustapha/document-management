const initialState = { isAuthenticated: false, loggedInUser: null };

export default function authReducer(state = initialState, action) {
  console.log(action.response);
  switch (action.type) {
    case 'LOGIN_USER':
      return { isAuthenticated: true, loggedInUser: { id: action.response.id } };
    case 'SIGNUP_USER':
      return [...state,
        Object.assign({}, action.response)
      ];
    case 'LOGOUT_USER':
      return [...state,
        Object.assign({}, action.response)
      ];
    default:
      return state;
  }
}
