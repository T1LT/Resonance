import { useContext } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ModalContext } from "../../App";
import { deleteChannel } from "../../store/channel";
import { deleteMessage } from "../../store/message";
import { deleteServer, removeMembership } from "../../store/server";
import "./DeleteConfirmation.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "170px",
    width: "440px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#36393F",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

const DeleteConfirmation = () => {
  const { isDeleteOpen, setIsDeleteOpen, isLeave, confirmationType } =
    useContext(ModalContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId, channelId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  const channel = useSelector((store) => store.channels[channelId]);
  const sessionUser = useSelector((store) => store.session.user);
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(false);
    if (confirmationType === "server") {
      dispatch(deleteServer(server.id));
      history.push("/me");
    } else if (confirmationType === "channel") {
      return dispatch(deleteChannel(channel.id)).then(() => {
        history.push(
          `/servers/${serverId}/channels/${server.defaultChannel.id}`
        );
      });
    } else {
      dispatch(deleteMessage(isDeleteOpen));
    }
  };
  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(false);
    dispatch(
      removeMembership(server.id, server.users[sessionUser.id].membershipId)
    );
    history.push("/me");
  };
  if (typeof isDeleteOpen === "number") {
    customStyles.content.height = "140px";
  } else {
    customStyles.content.height = "170px";
  }
  
  return (
    <Modal
      isOpen={!!isDeleteOpen}
      onRequestClose={() => setIsDeleteOpen(false)}
      style={customStyles}
      contentLabel="Delete Confirmation Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      {typeof isDeleteOpen !== "number" ? (
        <div className="delete-container">
          <h2 className="truncate">
            {isLeave ? "Leave" : "Delete"}{" "}
            {confirmationType === "server"
              ? `'${server?.serverName}'`
              : "Channel"}
          </h2>
          <p>
            Are you sure you want to {isLeave ? "leave" : "delete"}{" "}
            <strong>
              {confirmationType === "server"
                ? server?.serverName
                : channel?.channelName}
            </strong>
            ?
            {isLeave
              ? " You won't be able to rejoin this server unless you are re-invited."
              : " This action cannot be undone."}
          </p>
          <div className="delete-footer">
            <button
              type="button"
              id="cancel-button"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={isLeave ? handleLeave : handleDelete}
              id="confirm-delete-button"
            >
              {isLeave ? "Leave" : "Delete"}{" "}
              {confirmationType === "server" ? "Server" : "Channel"}
            </button>
          </div>
        </div>
      ) : (
        <div className="delete-container">
          <h2 className="truncate">Delete Message</h2>
          <p>Are you sure you want to delete this message?</p>
          <div className="delete-footer">
            <button
              type="button"
              id="cancel-button"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              id="confirm-delete-button"
            >
              Delete Message
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DeleteConfirmation;
