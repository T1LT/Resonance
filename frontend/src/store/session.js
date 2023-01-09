import csrfFetch, { storeCSRFToken } from "./csrf";

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeCurrentUser());
  storeCurrentUser(null);
  return response;
};

export const signUp = (payload) => async (dispatch) => {
  const { username, tag, email, password } = payload;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      tag,
      email,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  }
};

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
