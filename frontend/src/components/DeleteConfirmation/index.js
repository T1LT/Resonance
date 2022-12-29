import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteServer } from "../../store/server";
import "./DeleteConfirmation.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "160px",
    width: "440px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#36393F",
    overflow: "hidden"
  },
};

Modal.setAppElement("#root");

const DeleteConfirmation = ({ isDeleteOpen, setIsDeleteOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const serverId = Number(history.location.pathname.substring(9));
  const server = useSelector((store) => store.servers[serverId]);
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteServer(server.id));
    setIsDeleteOpen(false);
    history.push("/me");
  };

  return (
    <Modal
      isOpen={isDeleteOpen}
      onRequestClose={() => setIsDeleteOpen(false)}
      style={customStyles}
      contentLabel="Delete Confirmation Modal"
      overlayClassName="Overlay"
    >
      <div className="delete-container">
        <h2>Delete '{server?.serverName}'</h2>
        <p>
          Are you sure you want to delete <strong>{server?.serverName}</strong>?
          This action cannot be undone.
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
            onClick={handleDelete}
            id="confirm-delete-button"
          >
            Delete Server
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
