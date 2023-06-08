import React from "react";
import developerModel from "../../../Interfaces/developerModel";
import "../../../CSSs/Developer.css";
import { useNavigate } from "react-router-dom";
import { useDeleteDeveloperMutation } from "../../../API/developerApi";
import { useSelector } from "react-redux";
import { userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { SD_Roles } from "../../../Utility/SD";

const Developer: React.FC<{
  dev: developerModel;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}> = ({ dev, onDelete, onView }) => {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const navigate = useNavigate();
  const [deleteDev] = useDeleteDeveloperMutation();
  const handleUpdateClick = () => {
    navigate(`/developers/updateDeveloper/${dev.id}`, { state: { dev } });
  };

  return (
    <tbody>
      <tr style={{ borderBottom: "2px solid white" }}>
        <th scope="row">{dev.id}</th>
        <td className="td-left-border">{dev.userName}</td>
        <td className="td-left-border">{dev.name}</td>
        <td>
          <button
            type="submit"
            className="btn btn-warning"
            onClick={handleUpdateClick}
            // disabled={userData.role == SD_Roles.ADMIN}
          >
            Update
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => onDelete(dev.id)}
            // disabled={userData.role == SD_Roles.ADMIN}
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => navigate(`/developers/view/${dev.id}`)}
          >
            View
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Developer;
