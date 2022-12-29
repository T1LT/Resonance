import csrfFetch from "./csrf";

// TYPE CONSTANTS
const ADD_SERVER = "servers/addServer";
const ADD_SERVERS = "servers/addServers";
const REMOVE_SERVER = "servers/removeServer";

// ACTION CREATORS
export const addServer = (server) => ({
  type: ADD_SERVER,
  payload: server,
});

export const addServers = (servers) => ({
  type: ADD_SERVERS,
  payload: servers,
});

export const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  payload: serverId,
});

// THUNK ACTION CREATORS
export const fetchServers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/servers`);
  if (res.ok) {
    const servers = await res.json();
    dispatch(addServers(servers));
  }
};

export const fetchServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`);
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const createServer = (serverData) => async (dispatch) => {
  const res = await csrfFetch("/api/servers", {
    method: "POST",
    body: JSON.stringify({ server: serverData }),
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const updateServer = (serverData) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverData.id}`, {
    method: "PATCH",
    body: JSON.stringify({ server: serverData }),
  });
  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
  }
};

export const deleteServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeServer(serverId));
  }
};

// join server logic:
export const createMembership = (data) => async dispatch => {
  const res = await csrfFetch("/api/server_memberships", {
    method: "POST",
    body: JSON.stringify(data)
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addServer(data.server));
  }
};
// corresponding dispatch call:
// dispatch(
//   createMembership({
//     server_id: server.id,
//     user_id: sessionUser.id,
//   })
// );

// leave server logic:
// export const removeMembership = () => async dispatch => {};

const serverReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SERVERS:
      return { ...action.payload };
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
