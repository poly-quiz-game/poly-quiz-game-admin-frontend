import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, Line } from "@ant-design/plots";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard, selectDashboardList } from "../dashboardSlice";
const Dashboard = () => {

  const dispatch = useDispatch();
  const {questionType} = useSelector(selectDashboardList);

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  const data = [
    {
      type: "laquangduc",
      value: 27,
      year: "1999",
    },
    {
      type: "laquangduc1",
      value: 25,
      year: "1990",
    },
    {
      type: "laquangduc2",
      value: 18,
      year: "1899",
    },
    {
      type: "laquangduc3",
      value: 15,
      year: "1799",
    },
    {
      type: "laquangduc4",
      value: 10,
      year: "2999",
    },
    {
      type: "laquangduc5",
      value: 500,
      year: "2099",
    },
  ];

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
    xField: "year",
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

  return (
    <>
      <h1>Thống Kê</h1>
      <br />
      <div className="dashboard">
        <div>
          <Line {...column} />
          <br />
          <h2>
            <strong>Biểu đồ số lượng game được tổ chức theo tuần</strong>
          </h2>
        </div>
        <div>
          <Pie {...config} />
          <br />
          <h2>
            <strong>Biểu đồ loại câu hỏi được sử dụng nhiều nhất</strong>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
