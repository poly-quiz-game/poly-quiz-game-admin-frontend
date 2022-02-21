import { Breadcrumb, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import "./../style.css";
import { selectUserDetail, userDetail } from "../userSlice";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const LIMIT = 10;

const UserReport = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const { reports = [] } = useSelector(selectUserDetail) || {};
  const [offset, setOffset] = useState(0);
  const total = reports?.length;

  useEffect(() => {
    dispatch(userDetail(params.id));
  }, [dispatch, params]);

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "reportQuestions",
      render: (reportQuestions) => {
        return <p>{reportQuestions.length}</p>;
      },
    },
    {
      title: "Số lượng người chơi",
      dataIndex: "players",
      render: (players) => {
        return <p>{players.length}</p>;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
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
        <Breadcrumb.Item>User report</Breadcrumb.Item>
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
        pagination={pagination}
        columns={columns}
        dataSource={reports}
        onChange={onChange}
      />
    </div>
  );
};

export default UserReport;
