import csrfFetch from "./csrf";

// TYPE CONSTANTS
const ADD_FRIENDSHIP = "friendships/addFriendship";
const ADD_FRIENDSHIPS = "friendships/addFriendships";
const REMOVE_FRIENDSHIP = "friendships/removeFriendship";

// ACTION CREATORS
export const addFriendship = (friendship) => ({
  type: ADD_FRIENDSHIP,
  payload: friendship,
});

export const addFriendships = (friendships) => ({
  type: ADD_FRIENDSHIPS,
  payload: friendships
});

export const removeFriendship = (friendshipId) => ({
  type: REMOVE_FRIENDSHIP,
  payload: friendshipId
});

// THUNK ACTION CREATORS
export const fetchFriendships = () => async dispatch => {
  const res = await csrfFetch("/api/friendships");
  if (res.ok) {
    const friendships = await res.json();
    dispatch(addFriendships(friendships));
  }
};

export const createFriendship = (friendshipData) => async dispatch => {
  const res = await csrfFetch("/api/friendships", {
    method: "POST",
    body: JSON.stringify(friendshipData)
  });
  if (res.ok) {
    const friendship = await res.json();
    dispatch(addFriendship(friendship));
  }
};

export const updateFriendship = (friendshipData) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/${friendshipData.id}`, {
    method: "PATCH",
    body: JSON.stringify(friendshipData)
  });
  if (res.ok) {
    const friendship = await res.json();
    dispatch(addFriendship(friendship));
  }
};

export const deleteFriendship = (friendshipId) => async dispatch => {
  const res = await csrfFetch(`/api/friendships/${friendshipId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(removeFriendship(friendshipId));
  }
};

// REDUCER
const friendshipReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIENDSHIPS:
      return { ...action.payload };
    case ADD_FRIENDSHIP:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_FRIENDSHIP:
      const { [action.payload]: _, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default friendshipReducer;