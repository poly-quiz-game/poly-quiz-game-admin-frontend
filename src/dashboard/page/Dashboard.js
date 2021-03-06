import { Line, Pie } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Space, Table, Skeleton } from "antd";
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

function getSum(total, num) {
  return total + num;
}

const port =
  process.env.ENDPOINT || "https://poly-quiz-backend.azurewebsites.net/api";

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchDashboard(metadata));
      await dispatch(fetchTopUser());
      setLoading(false);
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
      type: "CH???N NHI???U",
      value: questionType && questionType.MULTIPLE_CORRECT_ANSWER,
    },
    {
      type: "CH???N M???T",
      value: questionType && questionType.SINGLE_CORRECT_ANSWER,
    },
    {
      type: "????NG SAI",
      value: questionType && questionType.TRUE_FALSE_ANSWER,
    },
    {
      type: "TR??? L???I TEXT",
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
      title: "S???? l??????ng game",
      dataIndex: "countreport",
    },
    {
      title: "S???? l??????ng ng??????i ch??i",
      dataIndex: "countplayer",
    },
  ];

  const onChange = (values) => {
    setMetadata({
      start: moment(values[0]._d).format("YYYY-MM-DD"),
      end: moment(values[1]._d).format("YYYY-MM-DD"),
    });
  };
  console.log(loading);
  return (
    <>
      <h1>Th????ng K??</h1>
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
      {loading ? (
        <Skeleton />
      ) : (
        <div className="profile-report">
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <h4>T???ng s??? quiz ???????c t???o</h4>
                <h1>{(countNewQuiz && countNewQuiz) || 0}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h4>T???ng s??? c??u h???i</h4>
                <h1>{(totalReport && totalReport) || 0}</h1>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h4>T???ng s??? ng?????i tham gia</h4>
                <h1>{(totalPlayersQuiz && totalPlayersQuiz) || 0}</h1>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Pie {...config} />
                <h3>T??? l??? lo???i c??u h???i ???????c t???o trong khoa??ng th????i gian</h3>
              </Card>
            </Col>
            <Col span={16}>
              <Card className="card-time">
                <Line {...column} />
                <h3>
                  Bi????u ?????? s???? l??????ng game ????????c t???? ch????c theo khoa??ng th????i gian
                </h3>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      <br />
      <div className="top-teacher">
        <h2>Top gi???ng vi??n t??? ch???c nhi???u game nh???t </h2>
        <Table columns={columns} dataSource={topUser} />
      </div>
    </>
  );
};

export default Dashboard;
