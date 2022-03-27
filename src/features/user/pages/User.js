import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Table
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  add,
  fetchUser,
  selectLoading,
  selectUserList,
  selectUserTotal,
  update
} from "../userSlice";

const validateMessages = {
  required: "Bạn chưa nhập ${label}",
  types: {
    email: "${label} cần nhập email",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const LIMIT = 10;

const { Option } = Select;

const User = () => {
  const ref = useRef();
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const total = useSelector(selectUserTotal);
  const loading = useSelector(selectLoading);
  const [form] = Form.useForm();

  const [metadata, setMetadata] = useState({
    offset: 0,
    limit: LIMIT,
    search: "",
    sortDirection: "desc",
    sortField: "createdAt",
  });

  const [state, setState] = useState({
    visible: false,
    placement: "top",
    title: "Thêm tài khoản",
    submit: "Thêm",
    role: "member",
    email: "",
  });

  const showDrawer = (condition) => {
    if (condition === "add") {
      setState({
        visible: true,
        placement: "right",
        title: "Thêm tài khoản",
        submit: "Thêm",
        role: "member",
        email: "",
      });
      form.setFieldsValue({
        role: "member",
      });
    } else {
      setState({
        visible: true,
        placement: "left",
        title: "Sửa tài khoản",
        submit: "Sửa",
        email: condition.email,
        role: condition.role,
        isActive: (
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item label="Active" name="isActive">
                <Switch defaultChecked={condition.isActive} />
              </Form.Item>
            </Col>
          </Row>
        ),
        id: <Form.Item name="id" hidden></Form.Item>,
      });
      form.setFieldsValue({
        email: condition.email,
        role: condition.role,
        isActive: condition.isActive,
        id: condition.id,
      });
    }
  };

  const onClose = () => {
    setState({
      visible: false,
    });
    form.setFieldsValue({
      email: "",
      role: "",
      isActive: "",
      id: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUser(metadata));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    ref.current = metadata;
  }, [dispatch, metadata]);

  const { offset } = metadata;

  const current = offset / LIMIT + 1;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Số quiz",
      dataIndex: "quizzes",
      render: (quizzes) => {
        return <p>{quizzes.length}</p>;
      },
    },
    {
      title: "Số Report",
      dataIndex: "reports",
      render: (reports) => {
        return <p>{reports.length}</p>;
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "isActive",
      render: (isActive) => {
        return (
          <>
            {isActive ? (
              <>
                <CheckCircleOutlined style={{ color: "#0ff100" }} /> Active
              </>
            ) : (
              <>
                <CloseCircleOutlined style={{ color: "#fb2626" }} /> Suspended
              </>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space
          size="middle"
          className="action-user"
          style={{ textAlign: "center" }}
        >
          <Link
            to={`/user/${record.id}/quiz-user`}
            style={{ padding: "2px 7px" }}
          >
            <InfoCircleOutlined /> Detail
          </Link>
          <div
            className="ant-space-item"
            onClick={() => showDrawer(record)}
            style={{ padding: "0 7px", color: "#1890ff" }}
          >
            <EditOutlined /> Edit
          </div>
        </Space>
      ),
    },
  ];
  const success = (title) => {
    message.success(`${title} user thành công!`);
  };

  const onFinish = async (values) => {
    if (values.isActive == undefined) {
      await dispatch(add(values));
      await dispatch(fetchUser(metadata));
      await onClose();
      await success("Add");
    } else {
      await dispatch(update(values));
      await dispatch(fetchUser(metadata));
      await onClose();
      await success("Sửa");
    }
  };

  function onChange(pagination, sorter) {
    setMetadata({
      ...metadata,
      sortField: sorter.field,
      sortDirection:
        sorter.field === metadata.sortField
          ? sorter.order === "ascend"
            ? "asc"
            : "desc"
          : "desc",
      offset: (pagination.current - 1) * LIMIT,
    });
  }

  const pagination = {
    defaultCurrent: 1,
    current: current,
    pageSize: LIMIT,
    total: total,
  };

  return (
    <div>
      <Breadcrumb style={{ textAlign: "right", marginRight: "27px" }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>Uer List</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Row>
        <Col span={5} offset={0}>
          <Button
            type="primary"
            style={{ borderRadius: "2px" }}
            onClick={() => showDrawer("add")}
          >
            Thêm tài khoản
          </Button>
        </Col>
      </Row>
      <hr style={{ opacity: "0.5" }} />
      <br />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "0 23px",
          borderRadius: "12px",
        }}
      >
        <Row>
          <Col
            span={5}
            offset={0}
            style={{
              textAlign: "center",
              display: "flex",
              margin: "9px 0",
              borderBottom: "1px solid #ccc",
            }}
          >
            <SearchOutlined style={{ alignSelf: "center", color: "#979797" }} />
            <Input
              className="search-user"
              placeholder="Search"
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  offset: 0,
                  search: e.target.value,
                })
              }
              style={{ border: "none" }}
              blur
            />
          </Col>          
        </Row>
        <Table
          columns={columns}
          loading={loading}
          bordered
          pagination={pagination}
          dataSource={users.map((u) => ({ ...u, key: u.id }))}
          onChange={onChange}
        />
        <Drawer
          title={state.title}
          width={400}
          onClose={onClose}
          visible={state.visible}
          key={state.placement}
          bodyStyle={{ paddingBottom: 80 }}
          placement={state.placement}
        >
          <Form
            form={form}
            layout="vertical"
            hideRequiredMark
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            {state.id}
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Chon role">
                    <Option value="member">Member</Option>
                    <Option value="teacher">Teacher</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {state.isActive}
            <br />
            <hr />
            <Space>
              <Button onClick={onClose}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {state.submit}
              </Button>
            </Space>
          </Form>
        </Drawer>
      </div>
    </div>
  );
};

export default User;
