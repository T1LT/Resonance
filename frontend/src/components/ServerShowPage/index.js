import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ServerShowPage = () => {
  const { serverId } = useParams();
  const server = useSelector((store) => store.session.user.servers[serverId]);

  return (
    <div>
      <h1>{server.server_name}</h1>
    </div>
  );
};

export default ServerShowPage;
