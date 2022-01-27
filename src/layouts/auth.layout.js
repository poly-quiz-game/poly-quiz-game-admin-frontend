import React from "react";
import { Layout } from "antd";

import { Link, Outlet } from "react-router-dom";

const { Header, Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout>
      <Header className="header">
        <Link to="/quiz">
          <div className="logo">Poly Quiz Game</div>
        </Link>
      </Header>
      <Content>
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
