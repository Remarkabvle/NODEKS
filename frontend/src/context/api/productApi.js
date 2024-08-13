import { api } from "./index";

export const ProductApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: "/product",
        params,
      }),
      providesTags: ["Product"],
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["Product"],
    }),
    createProduct: build.mutation({
      query: (body) => ({
        url: "/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: ({ id, body }) => ({
        url: `/product/${id}`,
        method: "PATCH", //
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} = ProductApi;
