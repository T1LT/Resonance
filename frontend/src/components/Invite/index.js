import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";
import { createMembership } from "../../store/server";
import { useDispatch, useSelector } from "react-redux";

const Invite = () => {
  const history = useHistory();
  const hash = history.location.pathname.substring(8);
  const [id, setId] = useState();
  const [pause, setPause] = useState(true);
  const dispatch = useDispatch();
  const sessionUser = useSelector((store) => store.session.user);
  useEffect(() => {
    const bytes = CryptoJS.AES.decrypt(hash, "secret");
    setId(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
    if (id) {
      dispatch(
        createMembership({
          server_id: id,
          user_id: sessionUser.id,
        })
      );
      setPause(false);
    }
  }, [id]);

  return <>{!pause && <Redirect to={`/servers/${id}`} />}</>;
};

export default Invite;
