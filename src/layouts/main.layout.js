import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  PieChartOutlined,
  DashboardOutlined,
  ControlOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/auth/authSlice";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/auth/login");
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo">{/* <Link to="/" >Home</Link> */}</div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          className="current"
        >
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="3" danger>
                  <a onClick={handleLogout}>Đăng xuất</a>
                </Menu.Item>
              </Menu>
            }
          >
            <div className="user-name">Hello : {user.name}</div>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            position: "fixed",
            zIndex: "100",
            height: "100vh",
            boxShadow: "0px 0px 28px 0px rgb(82 63 105 / 19%)",
          }}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <div>
              <Link to="/">
                <img
                  style={{ width: "150px", margin: "10px 20px 28px" }}
                  src="https://ap.poly.edu.vn/images/logo.png"
                />
              </Link>
            </div>
            <Menu.Item key="1" icon={<ControlOutlined />}>
              <Link to="/">Bảng điều khiển</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Thống kê</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/user">Danh sách tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<PieChartOutlined />}>
              <Link to="/question-type">Cài đặt câu hỏi</Link>
            </Menu.Item>
            {/* <Menu.Item key="4" icon={<FieldTimeOutlined />}>
              <Link to="/question-time">Thời gian câu hỏi</Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "24px 24px 0",
            minHeight: "100vh",
            margin: "65px 0 0 200px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
