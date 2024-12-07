import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:8800";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URI + "/api" }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

// export default apiSlice;
