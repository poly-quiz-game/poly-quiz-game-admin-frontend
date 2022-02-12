import React from "react";
import { Form, Input, Select, Tooltip, Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../questionTimeSlice";

const { Option } = Select;

const Add = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const data = {}
    if(values.unit.unit == 'minute'){
      data.name = values.number.number + ' Phút'
      data.time = values.number.number*60000
    }
    if(values.unit.unit == 'second'){
      data.name = values.number.number + ' Giây'
      data.time = values.number.number*1000
    }
    await dispatch(add(data));
    await navigate("/question-time", { replace: true });
  };
  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item label="Nhập">
        <Input.Group compact>
          <Form.Item
            name={["number", "number"]}
            noStyle
            rules={[{ required: true, message: "number is required" }]}
          >
            <Input style={{ width: "50%" }} placeholder="number" />
          </Form.Item>
          <Form.Item
            name={["unit", "unit"]}
            noStyle
            rules={[{ required: true, message: "unit is required" }]}
          >
            <Select placeholder="chọn đơn vị">
              <Option value="minute">Phút</Option>
              <Option value="second">Giây</Option>
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Add;
