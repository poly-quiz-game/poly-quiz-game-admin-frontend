import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, Line } from "@ant-design/plots";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard, selectDashboardList } from "../dashboardSlice";
import { DatePicker, Space, Row, Col, Divider } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};
function getDateArray(startDate, endDate, addFn, interval) {
  addFn = addFn || Date.prototype.addDays;
  interval = interval || 1;

  var retVal = [];
  var current = new Date(startDate);

  while (current <= new Date(endDate)) {
    retVal.push(moment(new Date(current)).format("YYYY-MM-DD"));
    current = addFn.call(current, interval);
  }

  return retVal;
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const { questionType, arrayCount } = useSelector(selectDashboardList);
  const [metadata, setMetadata] = useState({
    start: moment(Date.now()).subtract(30, "days").format("YYYY-MM-DD"),
    end: moment(Date.now()).format("YYYY-MM-DD"),
  });

  const countData =
    arrayCount?.reduce((a, v) => ({ ...a, [v.date]: v.count }), {}) || {};

  useEffect(() => {
    dispatch(fetchDashboard(metadata));
  }, [dispatch, metadata]);

  const data = getDateArray(metadata.start, metadata.end).map((date) => ({
    date,
    value: countData[date] || 0,
  }));

  const data1 = [
    {
      type: "CHỌN NHIỀU",
      value: questionType && questionType.MULTIPLE_CORRECT_ANSWER,
    },
    {
      type: "CHỌN MỘT",
      value: questionType && questionType.SINGLE_CORRECT_ANSWER,
    },
    {
      type: "ĐÚNG SAI",
      value: questionType && questionType.TRUE_FALSE_ANSWER,
    },
    {
      type: "TRẢ LỜI TEXT",
      value: questionType && questionType.TYPE_ANSWER,
    },
  ];

  const config = {
    appendPadding: 10,
    data: data1,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const column = {
    data,
    xField: "date",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  const onChange = (values) => {
    setMetadata({
      start: moment(values[0]._d).format("YYYY-MM-DD"),
      end: moment(values[1]._d).format("YYYY-MM-DD"),
    });
  };

  return (
    <>
      <h1>Thống Kê</h1>
      <br />
      <div className="calendar">
        <Space>
          <RangePicker onChange={onChange} />
        </Space>
      </div>
      <div className="statistical">
        <Row>
          <Col span={14} className="statistical-left">
            <div className="statistical__sum-quiz">
              <strong>256</strong>
              <br />
              <span>Tổng số quiz được tạo</span>
            </div>
            <div className="statistical__sum-quiz">
              <strong>256</strong>
              <br />
              <span>Tổng số game được chơi</span>
            </div>
            <div className="statistical__sum-quiz">
              <strong>124</strong>
              <br />
              <span>Người chơi</span>
            </div>
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <div className="statistical-right">
              <Pie {...config} />
              <br />

              <strong>Biểu Tỉ lệ loại câu hỏi được tạo</strong>
            </div>
          </Col>
        </Row>
      </div>

      <br />
      <div className="line-graph">
        <Line {...column} />
        <br />
        <h2>
          <strong>Biểu đồ số lượng game được tổ chức theo tuần</strong>
        </h2>
      </div>
      <div className="top-teacher">
        <h3>Top giảng viên tổ chức nhiều game nhất </h3>
      </div>
    </>
  );
};

export default Dashboard;
