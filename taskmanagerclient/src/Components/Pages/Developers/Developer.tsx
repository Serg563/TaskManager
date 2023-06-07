import React from "react";
import developerModel from "../../../Interfaces/developerModel";
import "../../../CSSs/Developer.css";
import { useNavigate } from "react-router-dom";
import { useDeleteDeveloperMutation } from "../../../API/developerApi";

const Developer: React.FC<{
  dev: developerModel;
  onDelete: (id: string) => void;
}> = ({ dev, onDelete }) => {
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
          >
            Update
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={() => onDelete(dev.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Developer;
