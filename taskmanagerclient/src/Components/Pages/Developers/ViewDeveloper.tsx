import React, { useEffect, useState } from "react";
import {
  useGetDevTaskByUserIdQuery,
  useUpdateDevTaskMutation,
} from "../../../API/taskApi";
import { useNavigate, useParams } from "react-router-dom";
import "../../../CSSs/Developer.css";
import { InputHelper } from "../../../Helper";
import UpdateViewDeveloper from "./UpdateViewDeveloper";
import { TaskModel } from "../../../Interfaces";

function ViewDeveloper() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: devTaskByUserId } = useGetDevTaskByUserIdQuery(id);

  // const [isEditingTime, setIsEditingTime] = useState(false);

  return (
    <div>
      <div style={{ float: "left", margin: "20px 100px" }}>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/developers")}
        >
          Back
        </button>
        <h2>User Id</h2>
        {id}
      </div>
      <h2 style={{ float: "right", marginRight: "600px" }}>User Tasks</h2>
      <table
        className="table-transparent"
        style={{ float: "right", marginRight: "300px", width: "600px" }}
      >
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>

        {devTaskByUserId ? (
          devTaskByUserId.map((tasks: TaskModel) => (
            <UpdateViewDeveloper devTaskId={tasks} />
            // <tbody>
            //   <tr style={{ borderBottom: "2px solid white" }}>
            //     <td className="td-left-border">{tasks.title}</td>
            //     <td className="td-left-border">{tasks.description}</td>
            //     {/* <td className="td-left-border">
            //       {(tasks.duration / 60).toFixed()} h {tasks.duration % 60} m {}
            //       <button className="btn btn-primary">Modify</button>
            //     </td> */}
            //     <td className="td-left-border">
            //       {isEditingTime ? (
            //         <input
            //           type="time"
            //           required
            //           name="duration"
            //           value={taskInput.duration}
            //           onChange={handleUserInput}
            //         />
            //       ) : (
            //         <span>
            //           {(tasks.duration / 60).toFixed()} h {tasks.duration % 60}{" "}
            //           m {}
            //         </span>
            //       )}
            //       {isEditingTime ? (
            //         <>
            //           <button
            //             type="button"
            //             className="btn btn-primary"
            //             onClick={() => handleUpdateClick(tasks.id)}
            //           >
            //             Update
            //           </button>
            //           <button
            //             type="button"
            //             className="btn btn-secondary"
            //             onClick={handleCancelClick}
            //           >
            //             Cancel
            //           </button>
            //         </>
            //       ) : (
            //         <>
            //           {}
            //           <button
            //             type="button"
            //             className="btn btn-warning"
            //             onClick={handleModifyClick}
            //           >
            //             Modify
            //           </button>
            //         </>
            //       )}
            //     </td>
            //   </tr>
            // </tbody>
          ))
        ) : (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default ViewDeveloper;
