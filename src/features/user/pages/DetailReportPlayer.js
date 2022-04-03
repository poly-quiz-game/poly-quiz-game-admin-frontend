import {
  FileExcelOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Progress, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { selectReportDetail, userReportDetail } from "../userSlice";
import "./../style.css";

const LIMIT = 10;

const DetailReportPlayer = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const reports = useSelector(selectReportDetail);
  const [offset, setOffset] = useState(0);
  const current = offset / LIMIT + 1;

  console.log(reports, "reports");
  useEffect(() => {
    dispatch(userReportDetail(params.reportId));
  }, [dispatch, params]);

  const { players, reportQuestions } = reports || {};
  const countQuestion = reportQuestions?.length;
  const values = players?.reduce((acc, cur) => {
    let initialData = { questionAnswe: 0, correctAnswer: 0 };
    const { id, name } = cur;
    console.log(cur, "cur");
    const valueQuestion = reportQuestions.reduce((ac, cu) => {
      console.log(cu);
      const {
        correctAnswer,
        questionTypeId,
        playerAnswer,
        reportQuestionAnswers,
      } = cu;
      const player = playerAnswer.filter(
        (item) => item.playerId === id && item.answer != ""
      );

      if (questionTypeId === 4) {
        const correctTypeAnswer = reportQuestionAnswers.filter(
          (item) => item.index === 0
        );
      }
      console.log(player, "player", correctAnswer);
      if (player[0]?.answer == correctAnswer) {
        console.log(ac.correctAnswer);
        ac.correctAnswer++;
      }

      if (player?.length > 0) {
        ac.questionAnswe++;
      }

      return ac;
    }, initialData);

    const countAnswer = valueQuestion.questionAnswe;
    const countCorrectAnswer = (
      (valueQuestion.correctAnswer / countQuestion) *
      100
    ).toFixed(1);
    const score = cur.score;
    return [
      ...acc,
      {
        id,
        name,
        countAnswer,
        countCorrectAnswer,
        countQuestion,
        score,
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
      title: "Số lượng câu hỏi",
      dataIndex: "countQuestion",
    },
    {
      title: "Số lượng câu trả lời",
      dataIndex: "countAnswer",
    },
    {
      title: "Tỉ lệ câu đúng",
      dataIndex: "countCorrectAnswer",
      render: (countCorrectAnswer) => {
        return (
          <Progress type="circle" percent={countCorrectAnswer} width={50} />
        );
      },
    },
    {
      title: "Điểm số",
      dataIndex: "score",
      render: (score, record) => {
        // /{record.countQuestion*1000}
        return <span>{score}</span>;
      },
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
          <Link to={`/user/${pagination.id}/quiz-user/${params.quizId}/${params.email}/quiz-report`}>
            <span>Danh sách báo cáo</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết báo cáo</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="btn">
          <NavLink
            className="btn-active"
            activeclass="active"
            to={`/user/${params.id}/quiz-user/${params.quizId}/${params.email}/${params.reportId}/detail-report/player`}
          >
            Người chơi
          </NavLink>
          {/* <NavLink
          className="btn-active"
          activeclass="active"
          to={`/user/${params.id}/quiz-user/${params.quizId}/${params.email}/${params.reportId}/detail-report/question`}
        >
          Câu hỏi
        </NavLink> */}
        </div>
        <div>
          <div
            style={{
              border: "1px solid #24ff35",
              padding: "2px 7px",
              background: "#24ff35",
              borderRadius: "4px",
              color: "#4c4c4c",
              cursor: "pointer",
            }}
          >
            <FileExcelOutlined /> <span>Xuất excel</span>
          </div>
        </div>
      </div>

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

export default DetailReportPlayer;
