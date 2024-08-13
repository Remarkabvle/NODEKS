import { Card, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useDeleteBlogsMutation,
  useGetBlogsQuery,
} from "../../../context/api/blogApi";

import UpdateModal from "../../../components/updateModal/UpdateModal";

const AdminBlog = () => {
  const { data } = useGetBlogsQuery();
  const [modalOpen, setModalOpen] = useState(null);
  const [deleteBlog] = useDeleteBlogsMutation();

  const handleCancel = () => {
    setModalOpen(null);
  };

  const handleDelete = (id) => {
    deleteBlog(id);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div className="p-4">
        <Row gutter={[16, 16]} className="flex flex-wrap">
          {data?.payload?.map((blog) => (
            <Col
              key={blog?._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="flex justify-center"
            >
              <Card bordered={false} className=" shadow-md ">
                <h2 className="text-lg font-semibold">{blog?.title}</h2>
                <p className="text-gray-600">{blog?.desc}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setModalOpen(blog)}
                    className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-green-500 "
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-red-500  "
                    onClick={() => handleDelete(blog?._id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {modalOpen ? (
        <UpdateModal handleCancel={handleCancel} modalOpen={modalOpen} />
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminBlog;
