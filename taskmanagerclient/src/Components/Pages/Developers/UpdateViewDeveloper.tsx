import React, { useState } from "react";
import { useUpdateDevTaskMutation } from "../../../API/taskApi";
import { InputHelper } from "../../../Helper";

import { useNavigate, useParams } from "react-router-dom";
import { TaskModel } from "../../../Interfaces";

interface TableComponentProps {
  devTaskId: TaskModel; // Adjust the type according to your data structure
}

const TableComponent: React.FC<TableComponentProps> = ({ devTaskId }) => {
  const [updateDevTask] = useUpdateDevTaskMutation();
  const navigate = useNavigate();
  const { paramId } = useParams();
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    duration: 0,
  });
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, taskInput);
    setTaskInput(tempData);
  };
  const [isEditingTime, setIsEditingTime] = useState(false);
  const handleModifyClick = () => {
    setIsEditingTime(true);
  };
  const handleCancelClick = () => {
    setIsEditingTime(false);
  };
  const handleUpdateClick = (id: number) => {
    updateDevTask({
      id: id,
      task: {
        title: taskInput.title,
        description: taskInput.description,
        duration: modifiedTimeInMinutes,
      },
    });
    setIsEditingTime(false);
  };
  const convertTimeToMinutes = (time: any) => {
    const timeString = String(time);
    const [hours, minutes] = timeString.split(":");
    const hoursInMinutes = parseInt(hours, 10) * 60;
    const minutesValue = parseInt(minutes, 10);
    return hoursInMinutes + minutesValue;
  };
  const modifiedTimeInMinutes = convertTimeToMinutes(taskInput.duration);

  return (
    <tbody>
      <tr style={{ borderBottom: "2px solid white" }} key={devTaskId.id}>
        <td className="td-left-border">{devTaskId.id}</td>
        <td className="td-left-border">{devTaskId.title}</td>
        <td className="td-left-border">{devTaskId.description}</td>
        <td className="td-left-border">
          {isEditingTime ? (
            <input
              type="time"
              required
              name="duration"
              value={taskInput.duration}
              onChange={handleUserInput}
            />
          ) : (
            <span>
              {(devTaskId.duration / 60).toFixed()} h {devTaskId.duration % 60}{" "}
              m {}
            </span>
          )}
          {isEditingTime ? (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleUpdateClick(devTaskId.id)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {}
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleModifyClick}
              >
                Modify
              </button>
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default TableComponent;
