import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchServer } from "../../store/server";

const ServerShowPage = () => {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  useEffect(() => {
    dispatch(fetchServer(serverId));
  }, [dispatch, serverId]);
  return (
    <div>
      <h1>{server.server_name}</h1>
      <ul>
        {Object.values(server.users).map((user) => (
          <li key={user.id}>
            <strong>{user.username}</strong>#{user.tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerShowPage;
