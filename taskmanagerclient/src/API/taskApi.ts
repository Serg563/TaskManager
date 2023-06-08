import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7240/api/Task/",
  }),

  endpoints: (builder) => ({
    getDevTasksPagination: builder.query({
      query: (page = 1, pageSize = 5) => ({
        url: `GetDevTasksPagination?page=${page}&pageSize=${pageSize}`,
      }),
    }),
    updateDevTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `UpdateDevTask/${id}`,
        method: "PUT",
        header: { "Context-type": "application/json" },
        body: task,
      }),
    }),
    getDevTaskByUserId: builder.query({
      query: (id) => ({
        url: `GetAllDevTaskByUserId/${id}`,
      }),
    }),
    deleteDeveloper: builder.mutation({
      query: (id) => ({
        url: `DeleteDeveloper/${id}`,
        method: "DELETE",
        header: { "Context-type": "application/json" },
      }),
    }),
  }),
});

export const {
  useGetDevTasksPaginationQuery,
  useUpdateDevTaskMutation,
  useGetDevTaskByUserIdQuery,
  useDeleteDeveloperMutation,
} = taskApi;
export default taskApi;
