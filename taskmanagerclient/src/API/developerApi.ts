import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const developerApi = createApi({
  reducerPath: "developerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7240/api/Developer/",
  }),

  endpoints: (builder) => ({
    getDevelopers: builder.query({
      query: () => "GetAllUsers",
    }),
    addDeveloper: builder.mutation({
      query: (developer) => ({
        url: "AddDeveloper",
        method: "POST",
        header: { "Context-type": "application/json" },
        body: developer,
      }),
    }),
    updateDeveloper: builder.mutation({
      query: ({ id, developer }) => ({
        url: `UpdateDeveloper/${id}`,
        method: "PUT",
        header: { "Context-type": "application/json" },
        body: developer,
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
  useGetDevelopersQuery,
  useAddDeveloperMutation,
  useUpdateDeveloperMutation,
  useDeleteDeveloperMutation,
} = developerApi;
export default developerApi;
