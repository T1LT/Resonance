import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import { createMembership } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";

const Invite = () => {
  const history = useHistory();
  const hash = history.location.pathname.substring(8);
  const [path, setPath] = useState();
  const [pause, setPause] = useState(true);
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  let id;
  useEffect(() => {
    const bytes = CryptoJS.AES.decrypt(hash, process.env.REACT_APP_SECRET_KEY);
    setPath(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    if (path) {
      id = path.substring(0, path.indexOf("/"));
      dispatch(
        createMembership({
          server_id: id,
          user_id: sessionUser.id,
        })
      ).then(() => setPause(false));
    }
  }, [path]);

  return <>{!pause && <Redirect to={`/servers/${path}`} />}</>;
};

export default Invite;
