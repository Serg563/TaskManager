import React, { useEffect, useState } from "react";
import { useGetDevTasksPaginationQuery } from "../../../API/taskApi";

function TaskList() {
  const [page, setPage] = useState(1);
  const {
    data: paginateDevTask,
    isLoading,
    isFetching,
    refetch,
  } = useGetDevTasksPaginationQuery(page);

  useEffect(() => {
    if (paginateDevTask) {
      console.log(paginateDevTask.products);
    }
  });

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
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      {paginateDevTask &&
        paginateDevTask.products.map((tasks: any) => (
          <div>
            {tasks.id} {tasks.title} {tasks.duration}
          </div>
        ))}

      <button onClick={handlePreviousPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default TaskList;
