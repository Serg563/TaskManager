import React, { useState } from "react";
import developerModel from "../../../Interfaces/developerModel";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateDeveloperMutation } from "../../../API/developerApi";
import { useLocation } from "react-router-dom";
import { InputHelper } from "../../../Helper";

function UpdateDeveloper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dev = location.state.dev;
  const [updateDeveloper] = useUpdateDeveloperMutation();
  const [userInput, setUserInput] = useState({
    developerName: dev.userName,
    name: dev.name,
    password: "",
  });
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, userInput);
    setUserInput(tempData);
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateDeveloper({
      id: id,
      developer: {
        developerName: userInput.developerName,
        name: userInput.name,
        password: userInput.password,
      },
    });
    if (response) {
      setUserInput({
        developerName: "",
        name: "",
        password: "",
      });
      navigate("/developers");
    }
  };
  return (
    <>
      <form method="put" onSubmit={handleSubmit}>
        <div
          className="mt-5 "
          style={{ marginBottom: "20px", marginLeft: "100px" }}
        >
          <div className="col-sm-4 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Developer Name"
              required
              name="developerName"
              value={userInput.developerName}
              onChange={handleUserInput}
            />
          </div>

          <div className="col-sm-4 offset-sm-3 col-xs-12 mt-4">
            <input
              type="test"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-4 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Password"
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
          <div
            className="col-sm-4 offset-sm-3 col-xs-12 mt-4"
            style={{ position: "relative" }}
          >
            <button
              type="submit"
              className="btn btn-success"
              style={{ width: "200px" }}
            >
              Update
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ position: "absolute", right: "0px" }}
              onClick={() => navigate("/developers")}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdateDeveloper;
