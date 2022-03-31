import { Line, Pie } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Space, Table } from "antd";
import io from "socket.io-client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboard,
  fetchTopUser,
  selectDashboardList,
  selectUserTopList,
} from "../dashboardSlice";
import "../styles.css";

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

function disabledDate(current) {
  return current && current > moment().endOf("day");
}

const port = process.env.ENDPOINT || "ws://localhost:3005";

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { questionType, arrayCount, countNewQuiz, countPlayers } =
    useSelector(selectDashboardList);

  const { topUser } = useSelector(selectUserTopList);
  const [metadata, setMetadata] = useState({
    start: moment(Date.now()).subtract(30, "days"),
    end: moment(Date.now()),
  });

  const countPlayersQuiz = countPlayers?.map((data) => {
    return data.players.length;
  });

  const totalPlayersQuiz =
    countPlayersQuiz?.length > 0 && countPlayersQuiz.reduce(getSum);

  const countData =
    arrayCount?.reduce((a, v) => ({ ...a, [v.date]: v.count }), {}) || {};

  const arrayCountReport = arrayCount?.map((data) => {
    return data.count;
  });
  const totalReport =
    arrayCountReport?.length > 0 && arrayCountReport.reduce(getSum);
  function getSum(total, num) {
    return total + num;
  }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDashboard(metadata));
      await dispatch(fetchTopUser());
    };
    fetchData();
  }, [dispatch, metadata]);

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("admin-get-game-playing");

      socket.on("admin-game-playing", (gamesPlaying) => {
        console.log("gamesPlaying: ", gamesPlaying);
      });
    }
  }, [socket]);

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

  //Top giang vien
  const columns = [
    {
      title: "TOP",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Số lượng game",
      dataIndex: "countreport",
    },
    {
      title: "Số lượng người chơi",
      dataIndex: "countplayer",
    },
  ];

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
          <RangePicker
            value={[moment(metadata.start), moment(metadata.end)]}
            onChange={onChange}
            disabledDate={disabledDate}
          />
        </Space>
      </div>
      {/* Html1 */}
      <div className="profile-report">
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <h4>Tổng số quiz được tạo</h4>
              <h1>{(countNewQuiz && countNewQuiz) || 0}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <h4>Tổng số câu hỏi</h4>
              <h1>{(totalReport && totalReport) || 0}</h1>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <h4>Tổng số người tham gia</h4>
              <h1>{(totalPlayersQuiz && totalPlayersQuiz) || 0}</h1>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Pie {...config} />
              <h3>Tỉ lệ loại câu hỏi được tạo trong khoảng thời gian</h3>
            </Card>
          </Col>
          <Col span={16}>
            <Card className="card-time">
              <Line {...column} />
              <h3>Biểu đồ số lượng game được tổ chức theo khoảng thời gian</h3>
            </Card>
          </Col>
        </Row>
      </div>

      <br />
      <div className="top-teacher">
        <h2>Top giảng viên tổ chức nhiều game nhất </h2>
        <Table columns={columns} dataSource={topUser} />
      </div>
    </>
  );
};

export default Dashboard;
