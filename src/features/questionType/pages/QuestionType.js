import { Space, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestiontype,
  selectQuestionTypeList,
  update,
} from "../questionTypeSlice";

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
          onChange={async (isActive) => {
            await dispatch(update({ ...record, isActive }));
            await dispatch(fetchQuestiontype());
          }}
        />
      ),
    },
  ];
  return (
    <div>
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
    </div>
  );
};

export default QuestionType;
