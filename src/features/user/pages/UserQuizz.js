import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { selectUserDetail, userDetail } from "../userSlice";
import "./../style.css";

const LIMIT = 10;

const UserQuizz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const { quizzes = [] } = useSelector(selectUserDetail) || {};
  const [offset, setOffset] = useState(0);
  const total = quizzes?.length;

  useEffect(() => {
    dispatch(userDetail(params.id));
  }, [dispatch, params]);

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Ảnh Nền",
      dataIndex: "backgroundImage",
      render: (backgroundImage) => {
        return <img width="150px" src={backgroundImage} />;
      },
    },
    {
      title: "Ảnh Bìa",
      dataIndex: "coverImage",
      render: (coverImage) => {
        return <img width="150px" src={coverImage} />;
      },
    },
    {
      title: "Số Lượng người chơi",
      dataIndex: "numberOfPlayer",
    },
    {
      title: "Đăng Nhập",
      dataIndex: "needLogin",
      render: (needLogin) => {
        return <p>{needLogin ? "Có" : "Không"}</p>;
      },
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "questions",
      render: (questions) => {
        return <p>{questions.length}</p>;
      },
    },
    {
      title: "Phần trăm đúng",
      dataIndex: "numberOfPlayer",
    },
  ];

  function onChange(pagination) {
    setOffset((pagination.current - 1) * LIMIT);
  }

  const pagination = {
    defaultCurrent: 1,
    current: current,
    pageSize: LIMIT,
    total: total,
  };

  return (
    <div>
      <Breadcrumb style={{ textAlign: "right", marginRight: "27px" }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/user">
            <UserOutlined />
            <span>User List</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>User quizz</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <br />
      <div className="btn">
        <NavLink
          className="btn-active"
          activeclass="active"
          to={`/user/${params.id}/quiz-user`}
        >
          User quizz
        </NavLink>
        <NavLink
          className="btn-active"
          activeclass="active"
          to={`/user/${params.id}/quiz-report`}
        >
          Report quizz
        </NavLink>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={quizzes}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default UserQuizz;
