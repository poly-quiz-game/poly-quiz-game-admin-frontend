import React, { useState, useEffect } from "react";
import {
  SearchOutlined,
  EditOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  add,
  fetchUser,
  selectUserList,
  selectUserTotal,
  update,
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
  const dispatch = useDispatch();
  const users = useSelector(selectUserList);
  const total = useSelector(selectUserTotal);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");
  const [form] = Form.useForm();
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
        id: <Form.Item name="_id" hidden></Form.Item>,
      });
      form.setFieldsValue({
        email: condition.email,
        role: condition.role,
        isActive: condition.isActive,
        _id: condition._id,
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
      _id: "",
    });
  };

  useEffect(() => {
    dispatch(fetchUser({ search, offset, limit: LIMIT, sortBy }));
  }, [dispatch, offset, search, sortBy]);

  const current = offset / LIMIT + 1;

  const data = users.map((user, index) => ({
    ...user,
    key: index,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: () => {
        if (sortBy == "-createdAt") {
          setSortBy("+name");
        } else if (sortBy == "+name") {
          setSortBy("-name");
        } else {
          setSortBy("+name");
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: () => {
        if (sortBy == "-createdAt") {
          setSortBy("+email");
        } else if (sortBy == "+email") {
          setSortBy("-email");
        } else {
          setSortBy("+email");
        }
      },
    },
    {
      title: "Role",
      dataIndex: "role",
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
            to={`/user/${record._id}/quiz-user`}
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
    console.log(!values._id);
    console.log(values);
    if (values.isActive == undefined) {
      await dispatch(add(values));
      await dispatch(fetchUser({ search, offset, limit: LIMIT, sortBy }));
      await onClose();
      await success("Add");
    } else {
      await dispatch(update(values));
      await dispatch(fetchUser({ search, offset, limit: LIMIT, sortBy }));
      await onClose();
      await success("Sửa");
    }
  };

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
      <Breadcrumb style={{textAlign: "right", marginRight: "27px"}}>
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
      <br/>
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
      <hr style={{opacity: "0.5"}}/>
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
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: "none" }}
              blur
            />
          </Col>
          <Col
            span={4}
            offset={14}
            style={{
              alignSelf: "center",
            }}
          >
            {/* <div
              style={{
                float: "left",
                border: "1px solid rgb(251 86 86)",
                padding: "4px 8px",
                borderRadius: "3px",
                backgroundColor: "#ededed",
                cursor: "pointer",
                color: "#f74747"
              }}
            >
              <DeleteOutlined
                style={{                  
                  alignSelf: "center",
                  color: "#979797",
                  marginRight: "5px",
                  color: "#ff4c4c"
                }}
                // onClick={() => {
                //   showDeleteConfirm(record.name, async () => {
                //     await dispatch(remove(record._id));
                //     await dispatch(fetchQuestionTime());
                //   });
                // }}
              />
              Delete
            </div> */}
            {/* <div
              style={{
                float: "right",
                border: "1px solid #ccc",
                padding: "4px 8px",
                borderRadius: "3px",
                backgroundColor: "#ededed",
                cursor: "pointer",
              }}
            >
              <FilterOutlined
                style={{                  
                  alignSelf: "center",
                  color: "#979797",
                  marginRight: "5px",
                }}
              />
              Filter
            </div> */}
          </Col>
        </Row>
        <Table
          columns={columns}
          bordered
          pagination={pagination}
          dataSource={data}
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
            // onFinishFailed={onFinishFailed}
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
                    <Option value="admin">Admin</Option>
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
