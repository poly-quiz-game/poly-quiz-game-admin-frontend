import {
  Modal,
  Switch,
  Table,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputNumber,
  Input,
} from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import questionTypeApi from "../../../api/questionType";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  fetchQuestiontype,
  selectQuestionTypeList,
  selectQuestionTimeList,
  update,
  updateTime,
  fetchQuestionTime,
} from "../questionTypeSlice";

const { confirm } = Modal;

const SINGLE_CORRECT_ANSWER = "SINGLE_CORRECT_ANSWER";
const MULTIPLE_CORRECT_ANSWER = "MULTIPLE_CORRECT_ANSWER";
const TRUE_FALSE_ANSWER = "TRUE_FALSE_ANSWER";
const TYPE_ANSWER = "TYPE_ANSWER";

export const questionTypes = {
  [SINGLE_CORRECT_ANSWER]: SINGLE_CORRECT_ANSWER,
  [MULTIPLE_CORRECT_ANSWER]: MULTIPLE_CORRECT_ANSWER,
  [TRUE_FALSE_ANSWER]: TRUE_FALSE_ANSWER,
  [TYPE_ANSWER]: TYPE_ANSWER,
};

export const questionTypeLabels = {
  [SINGLE_CORRECT_ANSWER]: "Một đáp án",
  [MULTIPLE_CORRECT_ANSWER]: "Nhiều đáp án",
  [TRUE_FALSE_ANSWER]: "Đúng sai",
  [TYPE_ANSWER]: "Nhập câu trả lời",
};

const QuestionType = () => {
  const dispatch = useDispatch();
  const questionType = useSelector(selectQuestionTypeList);
  const questionTime = useSelector(selectQuestionTimeList);

  const [showUpdateTimeModal, setShowUpdateTimeModal] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);

  useEffect(() => {
    dispatch(fetchQuestiontype());
    dispatch(fetchQuestionTime());
  }, [dispatch]);

  const deleteQuestion = async (record, isActive) => {
    await dispatch(update({ ...record, isActive }));
    await dispatch(fetchQuestiontype());
  };

  const onDisableQuestionType = async (record, isActive) => {
    if (isActive) {
      deleteQuestion(record, isActive);
      return;
    }
    const questionCount = await questionTypeApi.getQuestionCount({
      id: record.id,
    });
    console.log(questionCount);
    if (questionCount.data > 0) {
      confirm({
        title: "Bạn có muốn xóa toàn bộ câu hỏi thuộc loại này?",
        icon: <ExclamationCircleOutlined />,
        content: `Hiện đang có ${questionCount.data} câu hỏi thuộc loại này. Bạn có chắc muốn xóa?`,
        okText: "Có",
        okType: "danger",
        cancelText: "Không",
        onOk() {
          deleteQuestion(record, isActive);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
  };

  const handleUpdateTime = async (data) => {
    try {
      setUpdating(true);
      await dispatch(updateTime({ ...data, id: showUpdateTimeModal.id }));
      dispatch(fetchQuestionTime());
      setUpdating(false);
      setShowUpdateTimeModal(null);
    } catch (error) {
      console.log(error);
      setUpdating(false);
      setShowUpdateTimeModal(null);
    }
  };

  const columns = [
    {
      title: "Loại câu hỏi",
      dataIndex: "name",
      render: (name) => {
        return <p>{questionTypeLabels[name]}</p>;
      },
    },
    {
      title: "Kích hoạt",
      key: "action",
      render: (text, record) => (
        <Switch
          checkedChildren=""
          unCheckedChildren=""
          checked={record.isActive}
          onChange={(isActive) => onDisableQuestionType(record, isActive)}
        />
      ),
    },
  ];
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <h3>Loại câu hỏi</h3>
            <Table
              columns={columns}
              dataSource={questionType}
              pagination={{
                defaultCurrent: 1,
                current: 1,
                pageSize: 10,
                total: questionType.length,
                hideOnSinglePage: true,
              }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h3>Thời gian</h3>
            <Table
              columns={[
                { title: "Tên", dataIndex: "label" },
                {
                  title: "Thời gian",
                  dataIndex: "value",
                  render: (value) => {
                    return <div>{value} giây</div>;
                  },
                },
                {
                  title: "",
                  dataIndex: "",
                  render: (item) => {
                    return (
                      <Button onClick={() => setShowUpdateTimeModal(item)}>
                        Sửa
                      </Button>
                    );
                  },
                },
              ]}
              dataSource={questionTime}
              pagination={{
                defaultCurrent: 1,
                current: 1,
                total: questionTime.length,
                hideOnSinglePage: true,
              }}
            />
          </Card>
          <Modal
            title="Modal"
            visible={!!showUpdateTimeModal}
            footer={null}
            onOk={() => {
              setShowUpdateTimeModal(null);
            }}
            onCancel={() => setShowUpdateTimeModal(null)}
          >
            <Form
              layout="vertical"
              initialValues={{
                label: showUpdateTimeModal?.label,
                value: showUpdateTimeModal?.value,
              }}
              onFinish={handleUpdateTime}
            >
              <Form.Item label="Tên">
                <Form.Item
                  name="label"
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Thời gian (giây)">
                <Form.Item
                  name="value"
                  rules={[
                    { required: true, message: "Vui lòng nhập thời gian" },
                  ]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </Form.Item>
              <div>
                <Button onClick={() => setShowUpdateTimeModal(null)}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  loading={updating}
                >
                  Lưu
                </Button>
              </div>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default QuestionType;
