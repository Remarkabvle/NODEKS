import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useCreateProductMutation } from "../../../context/api/productApi";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();

  const handleSubmit = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "urls" && Array.isArray(values[key])) {
        values[key].forEach((file) => {
          formData.append("urls[]", file.originFileObj);
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    // Debug: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    createProduct(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/manage-product");
    }
  }, [isSuccess]);

  return (
    <Form
      name="basic"
      layout="vertical"
      className="gap-3 max-sm:w-full grid grid-cols-2"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
      autoComplete="off"
      encType="multipart/form-data"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required" }]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      {/* Additional form items for product details... */}

      <Form.Item
        label="Images"
        name="urls"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          return e && Array.isArray(e.fileList) ? e.fileList : [];
        }}
      >
        <Input type="file" multiple />
      </Form.Item>

      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
