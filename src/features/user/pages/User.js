import React, { useState, useEffect } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Switch, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUser,
  remove,
  selectUserList,
  selectUserTotal,
  update,
} from "../userSlice";

const LIMIT = 10;

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const total = useSelector(selectUserTotal);

  const { Search } = Input;
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUser({ search, offset, limit: LIMIT }));
  }, [dispatch, offset, search]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "role",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to="">
            <InfoCircleOutlined />
          </Link>
          <Space wrap>
            <Switch
              checkedChildren=""
              unCheckedChildren=""
              checked={record.isActive}
              onChange={async (isActive) => {
                await dispatch(update({ ...record, isActive }));
                await dispatch(fetchUser());
              }}
            />
          </Space>
        </Space>
      ),
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }

  return (
    <div>
      <Row>
        <Col span={5} offset={0} style={{ textAlign: "center" }}>
          <Button type="primary">
            <Link to="add">Thêm tài khoản</Link>
          </Button>
        </Col>
        <Col span={10} offset={3} style={{ textAlign: "center" }}>
          <Search
            placeholder="input search text"
            onChange={(e) => setSearch(e.target.value)}
            enterButton
          />
        </Col>
      </Row>
      <br />
      <br />
      <Table
        columns={columns}
        bordered
        dataSource={users}
        onChange={onChange}
        // rowSelection={rowSelection}
      />
    </div>
  );
};

export default User;
