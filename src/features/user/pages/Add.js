import React from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { add } from "../userSlice";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Add = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log(values.user);
    await dispatch(add(values.user));
    await navigate("/user", { replace: true });
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[
          {
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
