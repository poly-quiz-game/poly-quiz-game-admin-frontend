import { Input, Space, Button, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestiontype,
  selectLoading,
  selectQuestionTypeList,
  update,
} from "../questionTypeSlice";

const QuestionType = () => {
  const dispatch = useDispatch();
  const questionType = useSelector(selectQuestionTypeList);
  useEffect(() => {
    dispatch(fetchQuestiontype());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",

      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Space wrap>
            <Switch
              checkedChildren="on"
              unCheckedChildren="off"
              checked={record.isActive}
              onChange={async (isActive) => {
                await dispatch(update({ ...record, isActive }));
                await dispatch(fetchQuestiontype());
              }}
            />
          </Space>
          <br />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={questionType} />
    </div>
  );
};

export default QuestionType;
