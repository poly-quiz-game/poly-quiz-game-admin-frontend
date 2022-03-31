import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Button, Modal, Table } from "antd";

const port = process.env.ENDPOINT || "ws://localhost:3005";

export const getTimeString = (time) => {
  const date = new Date(time);

  if (
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  ) {
    const diffMinutes = Math.abs(date.getMinutes() - new Date().getMinutes());
    const diffHours = Math.abs(date.getHours() - new Date().getHours());
    if (date.getDate() === new Date().getDate()) {
      if (date.getHours() === new Date().getHours()) {
        if (date.getMinutes() === new Date().getMinutes()) {
          return `${diffMinutes} phút trước`;
        }
        return `${diffMinutes} phút trước`;
      }
      return `${diffHours} giờ ${diffMinutes} phút trước`;
    }

    const diffDays = Math.abs(date.getDate() - new Date().getDate());
    if (diffDays < 10) {
      return `${diffDays} ngày trước`;
    }
  }

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [gamesPlaying, setGamesPlaying] = useState([]);

  // const [detailModal, setDetailModal] = useState(null);

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.emit("admin-get-game-playing");

      socket.on("admin-game-playing", (gamesPlaying) => {
        setGamesPlaying(gamesPlaying);
      });
    }
  }, [socket]);

  useEffect(() => {
    const timer = setInterval(() => {
      socket.emit("admin-get-game-playing");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [socket]);

  const stopGame = (pin) => {
    socket.emit("admin-stop-game", pin);
  };

  const columns = [
    {
      title: "Chủ phòng",
      dataIndex: "host",
      render: (text, record) => (
        <div>
          <span>
            <strong>Tên:</strong> {record.host.name}
          </span>
          <br />
          <span>{record.host.email}</span>
        </div>
      ),
      key: "email",
      width: "15%",
    },
    {
      title: "Tên quiz",
      dataIndex: "quizData",
      render: (text, record) => (
        <div>
          <span>{record.quizData.name}</span>
        </div>
      ),
      key: "quizName",
      width: "20%",
    },
    {
      title: "PIN",
      dataIndex: "pin",
      key: "pin",
      width: "10%",
    },
    {
      title: "Số lượng người chơi",
      dataIndex: "players",
      render: (text, record) => (
        <div>
          <span>{record.players.length}</span>
        </div>
      ),
      key: "players",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          <span>{record.isLive ? "Đang chơi" : "Trong lobby"}</span>
        </div>
      ),
      key: "status",
      width: "10%",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      render: (text, record) => (
        <div>
          <span>{`${getTimeString(record.time)}`}</span>
        </div>
      ),
      key: "status",
      width: "10%",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          <span>
            <Button
              className="btn-stop"
              style={{ marginBottom: "10px" }}
              type="danger"
              onClick={() => stopGame(record.pin)}
            >
              Dừng
            </Button>
          </span>
          {/* <span>
            <Button
              className="btn-detail"
              type="primary"
              onClick={() => setDetailModal(record)}
            >
              Chi tiết
            </Button>
          </span> */}
        </div>
      ),
      key: "status",
      width: "10%",
    },
  ];

  return (
    <div>
      <Table
        dataSource={gamesPlaying}
        columns={columns}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default Dashboard;
