import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRegisterUserMutation, useGetProfileQuery } from "../../../context/api/userApi";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  const { data: profile } = useGetProfileQuery();

  const handleSubmit = (values) => {
    createUser(values);
  };

  useEffect(() => {
    if (profile?.payload?.role === "admin" || profile?.payload?.role === "user") {
      navigate("/dashboard/manage-blog");
    }
  }, [profile?.payload?.role]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-user");
    }
  }, [isSuccess]);

  return (
    <Form
      name="basic"
      layout="vertical"
      className="max-sm:w-full grid grid-cols-2 gap-4"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="fname"
        rules={[{ required: true, message: "First name is required" }]}
      >
        <Input placeholder="Enter first name" />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lname"
        rules={[{ required: false, message: "Last name is optional" }]}
      >
        <Input placeholder="Enter last name" />
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="url"
        rules={[{ required: false, message: "Image URL is optional" }]}
      >
        <Input placeholder="Enter image URL" />
      </Form.Item>

      {/* Additional form items... */}

      <Form.Item>
        <Button loading={isLoading} className="w-full" type="primary" htmlType="submit">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
