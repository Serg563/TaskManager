import React, { useEffect, useState } from "react";
import { InputHelper } from "../Helper";
import { apiResponse, userModel } from "../Interfaces";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../Storage/Redux/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../API/authApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import Center from "../Helper/Center";

declare global {
  interface Window {
    google: any;
  }
}

function Login() {
  const [error, setError] = useState("");
  const [userLogin] = useLoginUserMutation();
  const [isloading, setIsloading] = useState(false);

  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const mapping: { [key: string]: keyof userModel } = {
    name: "fullname",
    exp: "id",
    email: "email",
  };

  const handleClick = (response: any) => {
    const test = jwt_decode(response.credential);
    console.log(test);
    const decodedToken = jwt_decode(response.credential) as userModel;
    const userData: userModel = {
      fullname: decodedToken[mapping["name"]],
      id: decodedToken[mapping["exp"]] || "",
      email: decodedToken.email,
      role: "developer",
    };
    console.log(userData);
    localStorage.setItem("token", response.credential);
    dispatch(
      setLoggedIn({
        fullname: userData.fullname,
        id: userData.id,
        email: userData.email,
        role: userData.role,
      })
    );
    navigate("/");
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "21864522446-3iak4mufblmmtgni0iks2e6p90n9nnhr.apps.googleusercontent.com",
      callback: handleClick,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large", prompt: "" }
    );
  }, []);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = InputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);

    const response: apiResponse = await userLogin({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      //console.log(response.data);
      const { token } = response.data.result;
      const { fullname, id, email, role }: userModel = jwt_decode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedIn({ fullname, id, email, role }));
      navigate("/");
    } else if (response.error) {
      //console.log(response.error.data.errorMessages[0]);
      setError(response.error.data.errorMessages[0]);
    }

    setIsloading(false);
  };

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div
            className="col-sm-4 offset-sm-3 col-xs-12 mt-4"
            style={{ margin: "auto" }}
          >
            <input
              type="text"
              className="form-control transparent-input"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>

          <div
            className="col-sm-4 offset-sm-3 col-xs-12 mt-4"
            style={{ margin: "auto" }}
          >
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <p className="text-danger">{error}</p>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
        <div
          id="signInDiv"
          style={{ marginLeft: "550px", marginTop: "20px" }}
        ></div>
      </form>
    </div>
  );
}

export default Login;
