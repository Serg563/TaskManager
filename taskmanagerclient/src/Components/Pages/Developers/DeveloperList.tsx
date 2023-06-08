import React, { useEffect } from "react";
import {
  useDeleteDeveloperMutation,
  useGetDevelopersQuery,
} from "../../../API/developerApi";
import Developer from "./Developer";
import developerModel from "../../../Interfaces/developerModel";
import "../../../CSSs/Developer.css";
import { useNavigate } from "react-router-dom";
import UpdateDeveloper from "./UpdateDeveloper";

function DeveloperList() {
  const navigate = useNavigate();
  const [deleteDev] = useDeleteDeveloperMutation();
  const {
    data: developers,
    isLoading,
    isFetching,
    refetch,
  } = useGetDevelopersQuery(null);
  useEffect(() => {
    refetch();
  }, [developers]);

  if (!developers) {
    console.log("laoding");
  }
  const handleDeleteDeveloper = (id: any) => {
    deleteDev(id).then(() => {
      refetch();
    });
  };
  const handleViewDeveloper = (id: any) => {
    deleteDev(id).then(() => {
      refetch();
    });
  };
  // const handleUpdateDeveloper = (id: string, developers: developerModel) => {
  //   console.log();
  // };
  return (
    <div>
      <table className="table-transparent">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">
              {" "}
              <button
                className="btn btn-success Add-Button"
                type="submit"
                onClick={() => navigate("/addDeveloper")}
              >
                Add
              </button>
            </th>
          </tr>
        </thead>

        {developers ? (
          developers.map((data: developerModel) => (
            <>
              <Developer
                dev={data}
                onDelete={handleDeleteDeveloper}
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
    </div>
  );
}

export default DeveloperList;
