import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add, selectLoading, selectUserDetail, userDetail } from "../userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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

const CustomizedForm = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="name"
      label="Username"
      rules={[
        {
          required: true,
          message: 'Username is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
);

const Edit = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const user = useSelector(selectUserDetail);
  const loading = useSelector(selectLoading);

  const [fields, setFields] = useState([
    {
      name: ['name'],
      value: 'Ant Design',
    },
  ]);
    // if (loading === false) {
    //   setFields(user);
    // }
  console.log(loading, user);
  useEffect(() => {
    dispatch(userDetail(id));
    // reset(user);
  }, [dispatch, id]);

  const onFinish = (values) => {
    console.log(values)
  };
  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
    </>
  );
};

export default Edit;
