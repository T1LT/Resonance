import csrfFetch from "./csrf";

// TYPE CONSTANTS
const ADD_MESSAGES = "messages/addMessages";
const ADD_MESSAGE = "messages/addMessage";
const REMOVE_MESSAGE = "messages/removeMessage";
const CLEAR_MESSAGES = "messages/clearMessages";

// ACTION CREATORS
export const addMessages = (messages) => ({
  type: ADD_MESSAGES,
  payload: messages,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  payload: messageId,
});

export const clearMessages = () => ({
  type: CLEAR_MESSAGES
});

// THUNK ACTION CREATORS
export const fetchMessages = (serverId, channelId) => async dispatch => {
  if (serverId) {
    const res = await csrfFetch(`/api/servers/${serverId}/channels/${channelId}/messages`);
    if (res.ok) {
      const messages = await res.json();
      dispatch(addMessages(messages));
    }
  } else {
    const res = await csrfFetch(
      `/api/channels/${channelId}/messages`
    );
    if (res.ok) {
      const messages = await res.json();
      dispatch(addMessages(messages));
    }
  }
};

export const createMessage = (messageData) => {
  csrfFetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(messageData)
  });
};

export const updateMessage = (messageData) => {
  csrfFetch(`/api/messages/${messageData.id}`, {
    method: "PATCH",
    body: JSON.stringify(messageData)
  });
};

export const deleteMessage = (messageId) => {
  csrfFetch(`/api/messages/${messageId}`, {
    method: "DELETE"
  });
};

// REDUCER
const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGES:
      return { ...action.payload };
    case ADD_MESSAGE:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_MESSAGE:
      const { [action.payload]: _, ...newState } = state;
      return newState;
    case CLEAR_MESSAGES:
      return {};
    default:
      return state;
  }
};

export default messageReducer;