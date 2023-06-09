import React from "react";
import { TaskModel } from "../../../Interfaces";
import { useNavigate } from "react-router-dom";

const Task: React.FC<{
  task: TaskModel;
  onDelete: (id: number) => void;
  onView: (id: string) => void;
}> = ({ task, onDelete, onView }) => {
  const navigate = useNavigate();

  return (
    <tbody>
      <tr style={{ borderBottom: "2px solid white" }}>
        <th scope="row">{task.id}</th>
        <td className="td-left-border">{task.title}</td>
        <td className="td-left-border">{task.description}</td>
        <td className="td-left-border">
          {Math.floor(task.duration / 60)} h {task.duration % 60} m{" "}
        </td>
        <td>
          <button
            type="submit"
            className="btn btn-outline-warning"
            onClick={() => navigate("/updateTask", { state: { task: task } })}
          >
            Update
          </button>
          <button
            type="submit"
            className="btn "
            style={{ color: "red" }}
            onClick={() => onDelete(task.id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </button>
          <button type="submit" className="btn ">
            <i
              className="bi bi-check2-circle bi-5"
              style={{ fontSize: "1.5rem", color: "blue" }}
            ></i>
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Task;
