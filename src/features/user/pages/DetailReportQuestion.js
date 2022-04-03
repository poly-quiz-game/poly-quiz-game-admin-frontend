import { Breadcrumb, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import "./../style.css";
import { selectUserDetail, userDetail } from "../userSlice";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const LIMIT = 10;

const DetailReportQuestion = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const reports = useSelector(selectUserDetail);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log('aaa')
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
    },
    {
      title: "Số lượng câu trả lời",
      dataIndex: "players",
    },
    {
      title: "Tỉ lệ câu đúng",
      dataIndex: "createdAt",
    },
  ];

  function onChange(pagination) {
    setOffset((pagination.current - 1) * LIMIT);
  }

  const pagination = {
    defaultCurrent: 1,
    current: current,
    pageSize: LIMIT,
  };

  return (
    <div>
      <Breadcrumb style={{ textAlign: "right", marginRight: "7px" }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/user">
            <UserOutlined />
            <span>Danh sách tài khoản</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/user/${params.id}/quiz-user`}>
            <span>{params.email}</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/user/${params.id}/quiz-user`}>
            <span>Danh sách báo cáo</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết báo cáo</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <br />
      <div className="btn">
        <NavLink
          className="btn-active"
          activeclass="active"
          to={`/user/${params.id}/quiz-user/${params.quizId}/${params.email}/${params.reportId}/detail-report/player`}
        >
          Người chơi
        </NavLink>
        <NavLink
          className="btn-active"
          activeclass="active"
          to={`/user/${params.id}/quiz-user/${params.quizId}/${params.email}/${params.reportId}/detail-report/question`}
        >
          Câu hỏi
        </NavLink>
      </div>

      <Table
        bordered
        pagination={pagination}
        columns={columns}
        // dataSource={reports}
        onChange={onChange}
      />
    </div>
  );
};

export default DetailReportQuestion;

