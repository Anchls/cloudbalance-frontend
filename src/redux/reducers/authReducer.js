const initialState = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          token: action.payload.token,
          role: action.payload.role,
        };
      case "LOGOUT":
        return {
          token: null,
          role: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  