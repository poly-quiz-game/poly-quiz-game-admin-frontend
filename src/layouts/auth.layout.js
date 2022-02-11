import React from "react";
import { Col, Layout, Row } from "antd";

import { Link, Outlet } from "react-router-dom";
import "./styles.css";

const { Header, Content } = Layout;

const AuthLayout = () => {
  return (
    <div className="login-container">
      <Row>
        <Col span={8} offset={8}>
          <div>
            <div className="logo-login">
              <img
                alt="Logo"
                src="https://ap.poly.edu.vn/images/logo.png"
                width="200"
              />
            </div>
            <div className="site-layout-content">
              <Outlet />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AuthLayout;
