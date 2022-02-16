import React, { useEffect } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser, remove, selectUserList } from "../userSlice";
import { showDeleteConfirm } from "../../../confirm/DeleteConfirm";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "role",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to="/user/quiz-user">
            <InfoCircleOutlined />
          </Link>
          {/* <Link to={`${record._id}/edit`}>
            <EditOutlined />
          </Link> */}
          <DeleteOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => {
              showDeleteConfirm(record.email, async () => {
                await dispatch(remove(record._id));
                await dispatch(fetchUser());
              });
            }}
          />
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      {/* <Button type="primary">
        <Link to="add">Thêm tài khoản</Link>
      </Button> */}
      <br />
      <br />
      <Table columns={columns} dataSource={users} onChange={onChange} />
    </div>
  );
};

export default User;
