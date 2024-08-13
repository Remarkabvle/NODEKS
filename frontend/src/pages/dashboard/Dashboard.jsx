import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { useGetProfileQuery } from "../../context/api/userApi";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data } = useGetProfileQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="fixed top-0 left-0 h-screen z-50 py-3"
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <NavLink to={"manage-blog"}>
                  <UserOutlined />
                </NavLink>
              ),
              label: "Manage blog",
            },
            {
              key: "2",
              icon: (
                <NavLink to={"create-blog"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Create blog",
            },
            {
              key: "3",
              icon: (
                <NavLink to={"create-product"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Create Product",
            },
            {
              key: "4",
              icon: (
                <NavLink to={"manage-product"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Manage Product",
            },
            data?.payload?.role === "owner" && {
              key: "5",
              icon: (
                <NavLink to={"manage-user"}>
                  <UserOutlined />
                </NavLink>
              ),
              label: "Manage user",
            },
            data?.payload?.role === "owner" && {
              key: "6",
              icon: (
                <NavLink to={"create-user"}>
                  <VideoCameraOutlined />
                </NavLink>
              ),
              label: "Create user",
            },
          ]}
        />
      </Sider>
      <Layout className="ml-64 transition-all duration-300 ease-in-out">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="sticky top-0 left-0 z-50 flex justify-between items-center shadow-md px-4"
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className="flex items-center space-x-3">
            <Button onClick={handleLogOut}>Log Out</Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className="transition-all duration-300 ease-in-out"
        >
          {/* Page content goes here */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
