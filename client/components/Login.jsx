import { useContext, useState } from "react";
import AuthContext from "../contexts/auth";
import authApi from "../services/authApi";

export default function Login({ show, onClose }) {
  const [session, setSession] = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPass] = useState("");

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const onSubmit = async (e) => {
    const { data, status } = await authApi.login(user, password);

    if (status === 200) {
      const isAdmin = authApi.getUserLevel(data);
      await setSession({ isAdmin, token: data });
    } else alert(data);

    handleCloseClick(e);
  };

  return show ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleCloseClick}
          ></button>
        </div>
        <h5 className="modal-title">Sign In</h5>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="inputUser" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUser"
              placeholder="Type user name here"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPass"
              placeholder="Type your password here"
              onChange={(e) => setPass(e.target.value)}
              value={password}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={(e) => handleCloseClick(e)}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onSubmit(e)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
