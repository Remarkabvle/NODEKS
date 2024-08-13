import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useUpdateUserMutation } from "../../context/api/userApi";

const UpdateUser = ({ handleCancel, modalOpen }) => {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation();

  const onFinish = (values) => {
    updateUser({ body: values, id: modalOpen._id });
  };

  useEffect(() => {
    if (isSuccess) {
      handleCancel();
    }
  }, [isSuccess]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Update User"
      visible={modalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          fname: modalOpen?.fname,
          lname: modalOpen?.lname,
          url: modalOpen?.url,
          username: modalOpen?.username,
          password: "12345678",
          age: modalOpen?.age,
          gender: modalOpen?.gender,
          budget: modalOpen?.budget,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="First Name"
          name="fname"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lname"
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="url"
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
        >
          <Input placeholder="Enter age" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please input your gender!" }]}
        >
          <Input placeholder="Enter gender" />
        </Form.Item>

        <Form.Item
          label="Budget"
          name="budget"
          rules={[{ required: true, message: "Please input your budget!" }]}
        >
          <Input placeholder="Enter budget" />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button
            onClick={handleCancel}
            type="default"
            htmlType="submit"
          >
            Cancel
          </Button>
          <Button
            loading={isLoading}
            className="ml-4"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUser;
