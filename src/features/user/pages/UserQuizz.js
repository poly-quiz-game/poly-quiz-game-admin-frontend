import {
  DeleteOutlined,
} from "@ant-design/icons";
import {  Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { fetchUser, remove, selectLoading, selectUserList } from "../userSlice";
import "./../style.css";
const UserQuizz = () => {
  const data = [];
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const loading = useSelector(selectLoading);
  if (!loading) {
    users.map((user, index) => {
      data.push(Object.assign({}, user, { key: index }));
    });
  }
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
      title: "backgroundImage",
      dataIndex: "backgroundimage",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "questions",
      dataIndex: "questions",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "coverImage",
      dataIndex: "coverimage",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Link to={`${record._id}/edit`}>
              <EditOutlined />
            </Link> */}
          <DeleteOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={async () => {
              await dispatch(remove(record._id));
              await dispatch(fetchUser());
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
      <div className="btn">
        <NavLink className="btn-active" activeclass="active" to="/user/quiz-report">Report quizz</NavLink>
        <NavLink className="btn-active" activeclass="active" to="/user/quiz-user">User quizz</NavLink>
      </div>

      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default UserQuizz;
