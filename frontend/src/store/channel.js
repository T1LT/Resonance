import csrfFetch from "./csrf";

// TYPE CONSTANTS
const ADD_CHANNELS = "channels/addChannels";
const ADD_CHANNEL = "channels/addChannel";
const REMOVE_CHANNEL = "channels/removeChannel";
const CLEAR_CHANNELS = "channels/clearChannels";

// ACTION CREATORS
export const addChannels = (channels) => ({
  type: ADD_CHANNELS,
  payload: channels
});

export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel
});

export const removeChannel = (channelId) => ({
  type: REMOVE_CHANNEL,
  payload: channelId
});

export const clearChannels = () => ({
  type: CLEAR_CHANNELS
});

// THUNK ACTION CREATORS
export const fetchChannels = (serverId) => async dispatch => {
  const res = await csrfFetch(`/api/servers/${serverId}/channels`);
  if (res.ok) {
    const channels = await res.json();
    dispatch(addChannels(channels));
  }
};

export const fetchChannel = (channelId) => async dispatch => {
  const res = await csrfFetch(`/api/channels/${channelId}`);
  if (res.ok) {
    const channel = await res.json();
    dispatch(addChannel(channel));
  }
};

export const createChannel = async (channelData) => {
  const res = await csrfFetch(`/api/servers/${channelData.server_id}/channels`, {
    method: "POST",
    body: JSON.stringify(channelData)
  });
  if (res.ok) {
    const channel = await res.json();
    return channel;
  }
};

export const updateChannel = (channel) => {
  csrfFetch(`/api/channels/${channel.id}`, {
    method: "PATCH",
    body: JSON.stringify(channel)
  });
};

export const deleteChannel = (channelId) => {
  csrfFetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  });
};

// REDUCER
const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHANNELS:
      return { ...action.payload };
    case ADD_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_CHANNEL:
      const { [action.payload]: _, ...newState } = state;
      return newState;
    case CLEAR_CHANNELS:
      return {};
    default:
      return state;
  }
};

export default channelReducer;