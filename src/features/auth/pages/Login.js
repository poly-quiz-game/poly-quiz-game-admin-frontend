import React from "react";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { login } from "../authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async ({ tokenId }) => {
    try {
      await dispatch(login({ tokenId }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-screen">
      <Row>
        <Col span={12} offset={6}>
          <Col span={12} offset={8}>
            <GoogleLogin
              clientId={process.env.REACT_APP_O2AUTH_CLIENT_ID}
              buttonText="Login with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              hostedDomain="fpt.edu.vn"
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
