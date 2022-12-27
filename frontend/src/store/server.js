import csrfFetch from "./csrf";

// TYPE CONSTANTS
const ADD_SERVER = "servers/addServer";
const ADD_SERVERS = "servers/addServers";
const REMOVE_SERVER = "servers/removeServer";

// ACTION CREATORS
export const addServer = (server) => ({
  type: ADD_SERVER,
  payload: server
});

export const addServers = (servers) => ({
  type: ADD_SERVERS,
  payload: servers,
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  payload: serverId
});

// THUNK ACTION CREATORS
export const fetchServers = () => async dispatch => {
  const res = await csrfFetch(`/api/servers`);
  if (res.ok) {
    const servers = await res.json();
    dispatch(addServers(servers));
  }
};

export const fetchServer = (serverId) => async dispatch => {
  const res = await csrfFetch(`/api/servers/${serverId}`);
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const createServer = (serverData) => async dispatch => {
  const res = await csrfFetch("/api/servers", {
    method: "POST",
    body: JSON.stringify(serverData)
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const updateServer = (serverData) => async dispatch => {
  const res = await csrfFetch(`/api/servers/${server.id}`, {
    method: "PATCH",
    body: JSON.stringify(serverData)
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const deleteServer = (serverId) => async dispatch => {
  const res = await csrfFetch(`/api/servers/${serverId}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(removeServer(serverId));
  }
};

const serverReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SERVERS:
      return { ...state, ...action.payload }
    case ADD_SERVER:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_SERVER:
      const { [action.payload]: _, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default serverReducer;