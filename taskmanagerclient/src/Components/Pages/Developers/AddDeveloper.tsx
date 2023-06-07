import React, { useState } from "react";
import { useAddDeveloperMutation } from "../../../API/developerApi";
import { InputHelper } from "../../../Helper";
import { apiResponse } from "../../../Interfaces";
import { useNavigate } from "react-router-dom";

function AddDeveloper() {
  const navigate = useNavigate();
  const [developerInput, setDeveloperInut] = useState({
    developerName: "",
    name: "",
    password: "",
  });
  const [addDeveloper] = useAddDeveloperMutation();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, developerInput);
    setDeveloperInut(tempData);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: apiResponse = await addDeveloper({
      developerName: developerInput.developerName,
      name: developerInput.name,
      password: developerInput.password,
    });
    setDeveloperInut({
      developerName: "",
      name: "",
      password: "",
    });
    navigate("/developers");
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
              placeholder="Enter Email"
              required
              name="developerName"
              value={developerInput.developerName}
              onChange={handleUserInput}
              style={{ width: "100%" }}
            />
          </div>

          <div className="col-sm-5 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={developerInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-5 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={developerInput.password}
              onChange={handleUserInput}
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
            >
              Create
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              style={{ width: "100px", position: "absolute", right: "0px" }}
              onClick={() => navigate("/developers")}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDeveloper;
