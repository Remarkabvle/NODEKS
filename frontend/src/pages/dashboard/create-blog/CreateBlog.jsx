import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useCreateBlogsMutation } from "../../../context/api/blogApi";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [createBlog, { isLoading, isSuccess }] = useCreateBlogsMutation();

  const handleSubmit = (values) => {
    createBlog(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-blog");
    }
  }, [isSuccess]);

  return (
    <Form
      name="basic"
      layout="vertical"
      className="w-96 max-sm:w-full"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter the blog title" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        rules={[{ required: true, message: "Please enter the blog description" }]}
      >
        <Input placeholder="Enter description" />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBlog;
