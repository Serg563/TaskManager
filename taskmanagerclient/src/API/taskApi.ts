import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7240/api/Task/",
  }),

  endpoints: (builder) => ({
    getDevTasksPagination: builder.query({
      query: ({ userId, page = 1, pageSize = 5 }) => ({
        url: `GetDevTasksPagination/${userId}`,
        params: {
          page,
          pageSize,
        },
      }),
    }),
    addDevTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `AddDevTask/${id}`,
        method: "POST",
        header: { "Context-type": "application/json" },
        body: task,
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
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `DeleteDevTask/${id}`,
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
  useDeleteTaskMutation,
  useAddDevTaskMutation,
} = taskApi;
export default taskApi;
