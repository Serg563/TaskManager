import React, { useState, useEffect } from "react";
import { useAddDeveloperMutation } from "../../../API/developerApi";
import { InputHelper } from "../../../Helper";
import { TaskModel, apiResponse, userModel } from "../../../Interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddDevTaskMutation,
  useUpdateDevTaskMutation,
} from "../../../API/taskApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";

function UpdateTask() {
  const location = useLocation();
  const task: TaskModel = location?.state?.task ?? {};

  const navigate = useNavigate();
  const [taskInput, setTaskInut] = useState({
    title: task.title,
    description: task.description,
    duration: task.duration,
  });
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [updateTask] = useUpdateDevTaskMutation();
  const handleTaskInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, taskInput);
    setTaskInut(tempData);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: apiResponse = await updateTask({
      id: task.id,
      task: {
        title: taskInput.title,
        description: taskInput.description,
        duration: taskInput.duration,
      },
    });
    setTaskInut({
      title: "",
      description: "",
      duration: 0,
    });
    navigate("/tasks");
  };

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
              name="title"
              value={taskInput.title}
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
              type="number"
              className="form-control"
              placeholder="Enter spended time in minutes"
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
              //   onClick={() => handleClick}
            >
              Update
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

export default UpdateTask;
