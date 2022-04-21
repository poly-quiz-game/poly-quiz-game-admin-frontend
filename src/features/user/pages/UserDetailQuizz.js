import {
  CaretRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  FieldTimeOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Collapse, Image, Layout } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { quizDetail, selectQuizDetail } from "../../quiz/quizSlice";
import "./detail.css";

const { Content, Sider } = Layout;
const { Panel } = Collapse;
const CorrectIcon = (
  <span style={{ color: "#52c41a" }}>
    <CheckCircleFilled />
  </span>
);

const IncorretIcocn = (
  <span style={{ color: "#eb2f96" }}>
    <CloseCircleFilled />
  </span>
);

const QUESTION_COLOR = [
  { border: "2px solid rgb(226, 27, 60)" },
  { border: "2px solid rgb(19, 104, 206)" },
  { border: "2px solid rgb(216, 158, 0)" },
  { border: "2px solid rgb(38, 137, 12)" },
];
const QUESTION_LABELS = ["A", "B", "C", "D"];

const QUESTION_TYPE = [
  "Một đáp án",
  "Nhiều đáp án",
  "Đúng sai",
  "Nhập câu trả lời",
];

const UserDetailQuizz = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector(selectQuizDetail);

  const questions = quiz?.questions;

  console.log(params);
  useEffect(() => {
    dispatch(quizDetail(params.quizId));
  }, [dispatch, params]);

  // 2,MULTIPLE_CORRECT_ANSWER
  // 3,TRUE_FALSE_ANSWER
  // 4,TYPE_ANSWER
  // 1,SINGLE_CORRECT_ANSWER

  return (
    <>
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
        <Breadcrumb.Item>Chi tiết câu hỏi</Breadcrumb.Item>
      </Breadcrumb>
      <h2>{quiz?.name}</h2>
      <Layout>
        <div className="question">
          <h3>
            <span>({questions?.length})</span> câu hỏi
          </h3>
        </div>
        {questions?.map((question, index) => {
          return (
            <Collapse
              bordered={false}
              defaultActiveKey={[1]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse question"
            >
              <Panel
                header={QUESTION_TYPE[question.questionTypeId - 1]}
                key="1"
                className="site-collapse-custom-panel"
              >
                <div className="quizzquestion-top">
                  <div className="quizquestion-left">
                    <h5>
                      {question.question?.length > 80
                        ? question.question.substring(0, 75) + "..."
                        : question.question}
                    </h5>
                    <div className="timeLimit">
                      <FieldTimeOutlined
                        style={{ fontSize: "20px", marginRight: "15px" }}
                      />
                      Thời gian trả lời: {question.timeLimit / 1000} giây
                    </div>
                  </div>
                  <div className="quizquestion-right">
                    <Image
                      style={{
                        width: "234px",
                        height: "119px",
                        paddingTop: "5px",
                        borderRadius: "4px",
                        marginRight: "20px",
                        display: "block",
                      }}
                      src={
                        question.image === ""
                          ? "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
                          : question.image
                      }
                    ></Image>
                  </div>
                </div>
                <div className="quizzquestion-bottom">
                  {question.answers?.map((answer, key) => {
                    return (
                      <>
                        {answer.answer?.length > 0 && (
                          <div className="answer">
                            <div className="answer-question">
                              <div
                                className="answer-question-left"
                                style={QUESTION_COLOR[key]}
                              >
                                <h3>{QUESTION_LABELS[key]}</h3>
                              </div>
                              <div className="answer-question-right">
                                <h4>{answer.answer}</h4>
                              </div>
                            </div>
                            <div className="answer-icon">
                              {question.questionTypeId == 1 &&
                                (question.correctAnswer == answer.index
                                  ? CorrectIcon
                                  : IncorretIcocn)}
                              {question.questionTypeId == 2 &&
                                (question.correctAnswer.search(answer.index) !=
                                -1
                                  ? CorrectIcon
                                  : IncorretIcocn)}
                              {question.questionTypeId == 3 &&
                                (question.correctAnswer == answer.index
                                  ? CorrectIcon
                                  : IncorretIcocn)}
                              {question.questionTypeId == 4 &&
                                (question.correctAnswer == answer.index
                                  ? CorrectIcon
                                  : IncorretIcocn)}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          );
        })}
      </Layout>
    </>
  );
};

export default UserDetailQuizz;
