const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // Store token and role in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return {
        token: null,
        role: null,
      };

    default:
      return state;
  }
};

export default authReducer;
