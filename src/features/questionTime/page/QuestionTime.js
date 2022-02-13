import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showDeleteConfirm } from "../../../confirm/DeleteConfirm";
import {
  fetchQuestionTime,
  remove,
  selectQuestionTimeList,
} from "../questionTimeSlice";

const QuestionTime = () => {
  const dispatch = useDispatch();
  const questionTime = useSelector(selectQuestionTimeList);
  useEffect(() => {
    dispatch(fetchQuestionTime());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <DeleteOutlined
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => {
              showDeleteConfirm(record.name, async () => {
                await dispatch(remove(record._id));
                await dispatch(fetchQuestionTime());
              });
            }}
          />
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <Button type="primary">
        <Link to="add">Thêm mốc thời gian</Link>
      </Button>
      <br />
      <br />
      <Table columns={columns} dataSource={questionTime} onChange={onChange} />
    </div>
  );
};

export default QuestionTime;
