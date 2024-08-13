import { Navigate, Route, Routes } from "react-router-dom";

import CreateProduct from "./pages/dashboard/create-product/CreateProduct";
import ManageProduct from "./pages/dashboard/manage-product/ManageProduct";
import { lazy } from "react";
import { useSelector } from "react-redux";

const Auth = lazy(() => import("./pages/auth/Auth"));
const Home = lazy(() => import("./pages/home/Home"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/login/Login"));
const AdminBlog = lazy(() => import("./pages/dashboard/manage-blog/AdminBlog"));
const CreateBlog = lazy(() =>
  import("./pages/dashboard/create-blog/CreateBlog")
);
const ManageUser = lazy(() =>
  import("./pages/dashboard/manage-user/ManageUser")
);
const CreateUser = lazy(() =>
  import("./pages/dashboard/create-user/CreateUser")
);

const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="manage-blog" element={<AdminBlog />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="manage-user" element={<ManageUser />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="manage-product" element={<ManageProduct />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
