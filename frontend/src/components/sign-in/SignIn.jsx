import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../context/api/userApi";
import { setToken, setUser } from "../../context/slices/authSlice";

const SignIn = () => {
  const [signIn, { data, isSuccess, error, isError, isLoading }] =
    useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.payload.token));
      dispatch(setUser(data.payload.user));
      navigate("/dashboard/manage-blog");
    }
  }, [isSuccess]);

  const handleSubmit = (values) => {
    signIn(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign in</h2>
        {isError && (
          <Alert
            message="Error"
            description="There was an issue with your login."
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        <Form
          name="basic"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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

          <Form.Item>
            <Button
              disabled={isLoading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
              type="primary"
              htmlType="submit"
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
