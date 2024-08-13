import { Card, Col, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetProfileQuery,
  useGetUsersQuery,
} from "../../../context/api/userApi";

import UpdateUser from "../../../components/update-user/UpdateUser";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [modalOpen, setModalOpen] = useState(null);
  const { data: profile } = useGetProfileQuery();
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      profile?.payload?.role === "admin" ||
      profile?.payload?.role === "user"
    ) {
      navigate("/dashboard/manage-blog");
    }
  }, [profile?.payload?.role]);

  const { data, isLoading } = useGetUsersQuery();

  const handleCancel = () => {
    setModalOpen(null);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };
  return (
    <>
      <div className="p-4">
        <Row gutter={[16, 16]} className="flex flex-wrap">
          {data?.payload?.map((user) => (
            <Col
              key={user?._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="flex justify-center"
            >
              <Card bordered={false} className="w-full ">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold">
                    {user?.fname} {user?.lname}
                  </h3>
                  <p className="font-medium text-slate-500">
                    <span className="text-slate-800">username:</span>{" "}
                    {user?.username}
                  </p>
                  <div className=" flex gap-5">
                    <p className="font-medium text-slate-500">
                      <span className="text-slate-800">gender:</span>{" "}
                      {user?.gender}
                    </p>
                    <p className="font-medium text-slate-500">
                      <span className="text-slate-800">
                        <span className="text-slate-800">age:</span>
                      </span>{" "}
                      {user?.age}
                    </p>
                  </div>
                  <div className=" flex gap-5">
                    <p className="font-medium text-slate-500">
                      <span className="text-slate-800">budget:</span>{" "}
                      {user?.budget}
                    </p>
                    <p className="font-medium text-slate-500">
                      <span className="text-slate-800">role:</span> {user?.role}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setModalOpen(user)}
                    className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-green-500"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="text-cyan-50  rounded-md font-bold text-sm p-1 bg-red-500"
                    onClick={() => handleDelete(user?._id)}
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
        <UpdateUser handleCancel={handleCancel} modalOpen={modalOpen} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ManageUser;
