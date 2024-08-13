import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    getProfile: build.query({
      query: () => ({
        url: "/profile",
      }),
      providesTags: ["Profile"],
    }),
    signIn: build.mutation({
      query: (body) => ({
        url: "/users/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User", "Profile"],
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/users/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ body, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useRegisterUserMutation,
  useSignInMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
