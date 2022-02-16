import React, { useState, useEffect } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Switch, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUser,
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
  const [sortBy, setSortBy] = useState("-createdAt");


  useEffect(() => {
    dispatch(fetchUser({ search, offset, limit: LIMIT, sortBy }));
  }, [dispatch, offset, search, sortBy]);

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: () => {
        if(sortBy == '-createdAt'){
          setSortBy('+name')
        }else if(sortBy == '+name'){
          setSortBy('-name')
        }else {setSortBy('+name')}
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: () => {
        if(sortBy == '-createdAt'){
          setSortBy('+email')
        }else if(sortBy == '+email'){
          setSortBy('-email')
        }else {setSortBy('+email')}
      },
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link to={`/user/${record._id}/quiz-user`}>
            <InfoCircleOutlined />
          </Link>
          <Space wrap>
            <Switch
              checkedChildren=""
              unCheckedChildren=""
              checked={record.isActive}
              onChange={async (isActive) => {
                await dispatch(update({ ...record, isActive }));
                await dispatch(fetchUser({ search, offset, limit: LIMIT, sortBy }));
              }}
            />
          </Space>
        </Space>
      ),
    },
  ];

  function onChange(pagination) {
    setOffset((pagination.current - 1) * LIMIT)
  }

  const pagination = {
    defaultCurrent: 1,
    current: current,
    pageSize: LIMIT,
    total: total,
  };

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
        pagination={pagination}
        dataSource={users}
        onChange={onChange}
      />
    </div>
  );
};

export default User;
