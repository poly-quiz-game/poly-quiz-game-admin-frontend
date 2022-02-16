import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import React from "react";

const { confirm } = Modal;

export const showDeleteConfirm = (content, callback) => {
  confirm({
    title: "Có không giữ mất đừng tìm?",
    icon: <ExclamationCircleOutlined />,
    content: `Bạn có chắc muốn xóa: ${content}`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      callback();
      message.success(`Xóa ${content} thành công`);
    },
    onCancel() {
      message.error(`xóa ${content} thất bại`);
    },
  });
};
