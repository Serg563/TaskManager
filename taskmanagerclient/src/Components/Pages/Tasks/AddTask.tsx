import React, { useState } from "react";
import { useAddDeveloperMutation } from "../../../API/developerApi";
import { InputHelper } from "../../../Helper";
import { apiResponse, userModel } from "../../../Interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddDevTaskMutation } from "../../../API/taskApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

function AddTask() {
  const location = useLocation();
  const refetch = location?.state?.refetch;

  const navigate = useNavigate();
  const [taskInput, setTaskInut] = useState({
    taskTitle: "",
    description: "",
    duration: 0,
  });
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [addDevTask] = useAddDevTaskMutation();
  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, taskInput);
    setTaskInut(tempData);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: apiResponse = await addDevTask({
      id: userData.id,
      task: {
        title: taskInput.taskTitle,
        description: taskInput.description,
        duration: modifiedTimeInMinutes,
      },
    });
    setTaskInut({
      taskTitle: "",
      description: "",
      duration: 0,
    });
    navigate("/tasks");
  };
  const handleClick = () => {
    refetch();
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
    <div>
      <form
        method="post"
        onSubmit={handleSubmit}
        style={{ width: "800px", margin: "auto" }}
      >
        <div className="mt-5 ">
          <div className="col-sm-5 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              required
              name="taskTitle"
              value={taskInput.taskTitle}
              onChange={handleTaskInput}
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-sm-5 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              required
              name="description"
              value={taskInput.description}
              onChange={handleTaskInput}
            />
          </div>
          <div className="col-sm-5 offset-sm-3 col-xs-12 mt-4">
            <input
              type="time"
              required
              name="duration"
              value={taskInput.duration}
              onChange={handleTaskInput}
            />
          </div>
          <div
            className="col-sm-5 offset-sm-3 col-xs-12 mt-4"
            style={{ position: "relative" }}
          >
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
              onClick={() => handleClick}
            >
              Create
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ width: "100px", position: "absolute", right: "0px" }}
              onClick={() => navigate("/tasks")}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
