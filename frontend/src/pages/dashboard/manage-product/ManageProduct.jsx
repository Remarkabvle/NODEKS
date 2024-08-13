import "./ManageProduct.scss";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../context/api/productApi";

const ManageProduct = () => {
  const { data } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const products = data?.payload;
  return (
    <Fragment>
      <div className="product__cards">
        {products?.map((product) => (
          <div className=" product__cards__card">
            <div className="product__cards__card__img">
              <img className=" " src={product?.urls[0]} alt="" />
            </div>
            <div className="product__cards__card__info">
              <div className="df">
                <h2>{product?.title}</h2>
                <p>{product?.category}</p>
              </div>
              <div className="df">
                <p>Rating: {product?.rating}</p>
                <p>Stock: {product?.stock}</p>
              </div>
              <div className="df">
                <h3>Price: {product?.price}$</h3>
                <h3>{product?.userId?.fname}</h3>
              </div>
              <div className="df">
                <button className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-green-500 ">
                  <EditOutlined />
                </button>
                <button
                  className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-red-500"
                  onClick={() => handleDelete(product?._id)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ManageProduct;
