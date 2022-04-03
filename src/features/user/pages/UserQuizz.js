import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { selectUserDetail, userDetail } from "../userSlice";
import "./../style.css";

const LIMIT = 10;

const UserQuizz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const {quizzes, email} = useSelector(selectUserDetail);
  const [offset, setOffset] = useState(0);
  const total = quizzes?.length;

  useEffect(() => {
    dispatch(userDetail(params.id));
  }, [dispatch, params]);

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name) => {
        return <p style={{textAlign: 'left'}}>{name}</p>;
      },
    },
    {
      title: "Ảnh Nền",
      dataIndex: "backgroundImage",
      render: (backgroundImage) => {
        return (
          <img
            width="150px"
            src={
              backgroundImage ||
              "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
            }
          />
        );
      },
    },
    {
      title: "Ảnh Bìa",
      dataIndex: "coverImage",
      render: (coverImage) => {
        return (
          <img
            width="150px"
            src={
              coverImage ||
              "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
            }
          />
        );
      },
    },
    {
      title: "Người chơi tối đa",
      dataIndex: "numberOfPlayer",
      render: (numberOfPlayer) => {
        return (<><TeamOutlined /> <span style={{marginLeft: '10px'}}>{numberOfPlayer}</span></>)
      }
    },
    {
      title: "Đăng Nhập",
      dataIndex: "needLogin",
      render: (needLogin) => {
        return <span>{needLogin ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleOutlined style={{color: '#ff3535'}}  />}</span>;
      },
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "questions",
      render: (questions) => {
        return <><QuestionCircleOutlined /><span style={{marginLeft: '10px'}}>{questions.length}</span></>;
      },
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
          <Link to={`${record.id}/${email}`} style={{ padding: "2px 7px" }}>
            <InfoCircleOutlined /> Chi tiết
          </Link>
          <Link to={`${record.id}/${email}/quiz-report`} style={{ padding: "2px 7px" }}>
            <InfoCircleOutlined /> Báo cáo
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
    total: total,
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
        <Breadcrumb.Item>{email}</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <br />
      <Table
        bordered
        columns={columns}
        dataSource={quizzes}
        pagination={pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default UserQuizz;
