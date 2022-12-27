import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServer } from "../../store/server";

const ServerShowPage = () => {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  useEffect(() => {
    dispatch(fetchServer(serverId));
  }, [dispatch])
  return (
    <div>
      <h1>{server.server_name}</h1>
      <ul>
        {Object.values(server.users).map(user => (
          <li key={user.id}>{user.username}#{user.tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServerShowPage;
