import { Modal, Switch, Table, Row, Col, Card } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTypeApi from "../../../api/questionType";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  fetchQuestiontype,
  selectQuestionTypeList,
  update,
} from "../questionTypeSlice";

const { confirm } = Modal;

const SINGLE_CORRECT_ANSWER = "SINGLE_CORRECT_ANSWER";
const MULTIPLE_CORRECT_ANSWER = "MULTIPLE_CORRECT_ANSWER";
const TRUE_FALSE_ANSWER = "TRUE_FALSE_ANSWER";
const TYPE_ANSWER = "TYPE_ANSWER";

export const questionTypes = {
  [SINGLE_CORRECT_ANSWER]: SINGLE_CORRECT_ANSWER,
  [MULTIPLE_CORRECT_ANSWER]: MULTIPLE_CORRECT_ANSWER,
  [TRUE_FALSE_ANSWER]: TRUE_FALSE_ANSWER,
  [TYPE_ANSWER]: TYPE_ANSWER,
};

export const questionTypeLabels = {
  [SINGLE_CORRECT_ANSWER]: "Một đáp án",
  [MULTIPLE_CORRECT_ANSWER]: "Nhiều đáp án",
  [TRUE_FALSE_ANSWER]: "Đúng sai",
  [TYPE_ANSWER]: "Nhập câu trả lời",
};

const QuestionType = () => {
  const dispatch = useDispatch();
  const questionType = useSelector(selectQuestionTypeList);

  useEffect(() => {
    dispatch(fetchQuestiontype());
  }, [dispatch]);

  const deleteQuestion = async (record, isActive) => {
    await dispatch(update({ ...record, isActive }));
    await dispatch(fetchQuestiontype());
  };

  const onDisableQuestionType = async (record, isActive) => {
    if (isActive) {
      deleteQuestion(record, isActive);
      return;
    }
    const questionCount = await questionTypeApi.getQuestionCount({
      id: record.id,
    });
    console.log(questionCount);
    if (questionCount.data > 0) {
      confirm({
        title: "Bạn có muốn xóa toàn bộ câu hỏi thuộc loại này?",
        icon: <ExclamationCircleOutlined />,
        content: `Hiện đang có ${questionCount.data} câu hỏi thuộc loại này. Bạn có chắc muốn xóa?`,
        okText: "Có",
        okType: "danger",
        cancelText: "Không",
        onOk() {
          deleteQuestion(record, isActive);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const columns = [
    {
      title: "Loại câu hỏi",
      dataIndex: "name",
      render: (name) => {
        return <p>{questionTypeLabels[name]}</p>;
      },
    },
    {
      title: "Kích hoạt",
      key: "action",
      render: (text, record) => (
        <Switch
          checkedChildren=""
          unCheckedChildren=""
          checked={record.isActive}
          onChange={(isActive) => onDisableQuestionType(record, isActive)}
        />
      ),
    },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Table
              columns={columns}
              dataSource={questionType}
              pagination={{
                defaultCurrent: 1,
                current: 1,
                pageSize: 10,
                total: questionType.length,
                hideOnSinglePage: true,
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h4>Thời gian</h4>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionType;
