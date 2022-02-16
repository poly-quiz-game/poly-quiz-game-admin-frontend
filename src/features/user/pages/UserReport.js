import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./../style.css";
import { selectUserDetail, userDetail } from "../userSlice";

const LIMIT = 10;

const UserReport = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const { reports } = useSelector(selectUserDetail);
  const [offset, setOffset] = useState(0);
  const total = reports?.length;

  useEffect(() => {
    dispatch(userDetail(params.id));
  }, [dispatch]);

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "questions",
      render: (questions) => {
        return <p>{questions.length}</p>;
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
        pagination={pagination}
        columns={columns}
        dataSource={reports}
        onChange={onChange}
      />
    </div>
  );
};

export default UserReport;
