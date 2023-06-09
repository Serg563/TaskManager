import React, { useEffect, useState, useRef } from "react";
import {
  useDeleteTaskMutation,
  useGetDevTasksPaginationQuery,
} from "../../../API/taskApi";
import { useSelector } from "react-redux";
import { TaskModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import "../../../CSSs/Pagination.css";

function TaskList() {
  const navigate = useNavigate();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState("");
  const {
    data: paginateDevTask,
    isLoading,
    isFetching,
    refetch,
  } = useGetDevTasksPaginationQuery({ userId: userData.id, page, pageSize: 5 });
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    refetch();
  }, [paginateDevTask]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < paginateDevTask.pagination.totalPages) {
      setPage(page + 1);
    }
  };
  const handleDeleteTask = (id: number) => {
    if (window.confirm("Are you sure?")) {
      deleteTask(id).then(() => {
        refetch();
      });
    }
  };
  const handleViewDeveloper = (id: any) => {
    // deleteDev(id).then(() => {
    //   refetch();
    // });
  };
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const HandlePage = (count: number) => {
    setPage(count);
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "10px", position: "relative" }}
    >
      <table className="table-transparent">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">
              <button
                type="submit"
                className="btn btn-transparent"
                onClick={() =>
                  navigate("/addTask", { state: { refetch: refetch } })
                }
              >
                <i
                  className="bi bi-pencil-fill"
                  style={{ fontSize: "1.5rem", color: "green" }}
                ></i>
              </button>
            </th>
          </tr>
        </thead>

        {paginateDevTask ? (
          paginateDevTask.tasks
            .filter((task: any) =>
              task.title.toLowerCase().includes(filter.toLowerCase())
            )
            .map((data: TaskModel) => (
              <>
                <Task
                  task={data}
                  onDelete={handleDeleteTask}
                  onView={handleViewDeveloper}
                  key={data.id}
                />
              </>
            ))
        ) : (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        )}
      </table>

      <div>
        <input
          type="text"
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search title"
          style={{
            backgroundColor: "#001e3c",
            border: "2px solid blue",
            width: "250px",
            float: "right",
            position: "absolute",
            top: "20px",
            right: "20px",
          }}
        />
      </div>

      <div className="pagination">
        {paginateDevTask &&
          Array.from(Array(paginateDevTask.pagination.totalPages).keys()).map(
            (pageNumber) => (
              <span
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber + 1)}
                className={
                  pageNumber + 1 === page ? "pagination__selected" : ""
                }
              >
                {pageNumber + 1}
              </span>
            )
          )}
      </div>
    </div>
  );
}

export default TaskList;
