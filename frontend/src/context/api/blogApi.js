import { api } from "./index";

export const blogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (params) => ({
        url: "/blogs",
        params,
      }),
      providesTags: ["Blogs"],
    }),
    getBlogsById: build.query({
      query: (id) => ({
        url: `/blogs/${id}`,
      }),
      providesTags: ["Blogs"],
    }),
    createBlogs: build.mutation({
      query: (body) => ({
        url: "/blogs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlogs: build.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlogs: build.mutation({
      query: ({ id, body }) => ({
        url: `/blogs/${id}`,
        method: "PATCH", //
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useUpdateBlogsMutation,
} = blogApi;
