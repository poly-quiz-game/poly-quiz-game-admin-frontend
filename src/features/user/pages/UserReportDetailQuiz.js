import { Breadcrumb, Progress, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import "./../style.css";
import {
  fetchReportQuizDetail,
  selectReport,
  selectUserDetail,
  userDetail,
} from "../userSlice";
import {
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

const LIMIT = 10;

const UserReport = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const reports = useSelector(selectReport);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchReportQuizDetail(params.quizId));
  }, [dispatch, params]);

  const current = offset / LIMIT + 1;
  const values =
    reports?.length > 0 &&
    reports.reduce((acc, cur) => {
      const { id, name, quizId, players, reportQuestions, total, createdAt } =
        cur;

      const countQuestion = reportQuestions.length;
      const countPlayer = players.length;
      const correctAnswerPlayer = 0;
      const correctPlayerAnswer = reportQuestions.reduce((ac, cu) => {
        const {
          correctAnswer,
          playerAnswer,
          questionTypeId,
          reportQuestionAnswers,
        } = cu;
        const totalPlayerAnswer = playerAnswer.length;
        let totalCorrectAnswer = 0;
        if (questionTypeId === 4) {
          const correctTypeAnswer = reportQuestionAnswers.filter(
            (item) => item.index === 0
          );
          totalCorrectAnswer = playerAnswer.reduce((a, c) => {
            if (c.answer === correctTypeAnswer[0].answer) {
              return a + 1;
            }
            return a;
          }, 0);
        } else {
          totalCorrectAnswer = playerAnswer.reduce((a, c) => {
            if (c.answer == correctAnswer) {
              return a + 1;
            }
            return a;
          }, 0);
        }
        return ac + (totalCorrectAnswer / totalPlayerAnswer) * 100;
      }, 0);
      const correctPercentage = (correctPlayerAnswer / countQuestion).toFixed(
        1
      );
      return [
        ...acc,
        {
          id,
          name,
          quizId,
          countPlayer,
          countQuestion,
          correctPercentage,
          createdAt: moment(createdAt).format("DD/MM/YYYY HH:mm"),
        },
      ];
    }, []);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Tổng số câu hỏi",
      dataIndex: "countQuestion",
    },
    {
      title: "Số lượng người chơi",
      dataIndex: "countPlayer",
    },
    {
      title: "Phần trăm trả lời đúng",
      dataIndex: "correctPercentage",
      render: (correctPercentage) => {
        return (
          <Progress type="circle" percent={correctPercentage} width={50} />
        );
      },
    },
    {
      title: "Thời gian chơi",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space
          size="middle"
          className="action-user"
          style={{ textAlign: "center" }}
        >
          <Link to={`/user/${params.id}/quiz-user/${params.quizId}/${params.email}/${record.id}/detail-report/player`} style={{ padding: "2px 7px" }}>
            <InfoCircleOutlined /> Chi tiết
          </Link>
        </Space>
      ),
    },
  ];

  function onChange(pagination) {
    setOffset((pagination.current - 1) * LIMIT);
  }

  const pagination = {
    defaultCurrent: 1,
    current: current,
    pageSize: LIMIT,
    // total: total,
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
        <Breadcrumb.Item>Danh sách báo cáo</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <br />
      <Table
        bordered
        pagination={pagination}
        columns={columns}
        dataSource={values}
        onChange={onChange}
      />
    </div>
  );
};

export default UserReport;
