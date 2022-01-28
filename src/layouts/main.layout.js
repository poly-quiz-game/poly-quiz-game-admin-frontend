import React from "react";
import { Layout, Menu, Breadcrumb, Dropdown } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/auth/authSlice";
// import { logout, selectUser } from "../features/auth/authSlice";

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
        <div className="logo">
          <img src="./images/ongvang6.png" />
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]} className="current">
        <div className="user-name">Hello : {user.name}</div>
          <Dropdown
            overlay={
              <Menu>
               
                <Menu.Item key="3" danger>
                  <a onClick={handleLogout}>Đăng xuất</a>
                 
                </Menu.Item>
              </Menu>
            }
          >
            <div className="current-user">
              <img width={45} src="https://picsum.photos/200" className="current-image" />
              
            </div>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="1">
                <Link to="/user">List user</Link>
              </Menu.Item>
            </SubMenu>            
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>          
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
