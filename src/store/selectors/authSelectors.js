const authSelector = (state) => state.auth;

export const isLoggedInSelector = (state) => authSelector(state).isLoggedIn;

export const userSelector = (state) => authSelector(state).user;
