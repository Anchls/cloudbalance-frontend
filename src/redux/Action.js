export const loginSuccess = (data) => ({
    type: "LOGIN",
    payload: data,
  });
  
  export const logout = () => ({
    type: "LOGOUT",
  });
 