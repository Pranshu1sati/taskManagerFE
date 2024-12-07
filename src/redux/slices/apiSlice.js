import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "https://taskmanagerbe-ksq9.onrender.com";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URI + "/api" }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

// export default apiSlice;
