import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { quizDetail, selectQuizDetail } from "../../quiz/quizSlice";
const columns = [
  {
    title: "Câu hỏi",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Phần trăm trả lời đúng",
    dataIndex: "percent",
    key: "percent",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    percent: 32,
  },
  {
    key: "1",
    name: "John Brown",
    percent: 40,
  },
  {
    key: "1",
    name: "John Brown",
    percent: 50,
  },
];
const UserDetailQuizz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const { quizzes = [] } = useSelector(selectQuizDetail) || {};

  useEffect(() => {
    dispatch(quizDetail(params.id));
  }, [dispatch, params]);

  console.log(quizzes);

  return (
    <>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default UserDetailQuizz;
