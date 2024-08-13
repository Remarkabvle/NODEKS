import React, { useEffect } from "react";
import { Form, Modal, Input, Button } from "antd";
import { useUpdateBlogsMutation } from "../../context/api/blogApi";

const UpdateModal = ({ handleCancel, modalOpen }) => {
  const [updateBlog, { isLoading, isSuccess }] = useUpdateBlogsMutation();

  const onFinish = (values) => {
    updateBlog({ body: values, id: modalOpen._id });
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
      title="Update Blog"
      visible={modalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          title: modalOpen?.title,
          desc: modalOpen?.desc,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input your description!" }]}
        >
          <Input placeholder="Enter description" />
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

export default UpdateModal;
