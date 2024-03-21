import { useEffect, useState } from "react";
import InboxCard from "../../../components/component/InboxCard/InboxCard";
import "./ChatWithLessor.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { socket } from "../../../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import Messages from "./Messages";
import Header from "../../../components/component/Header";

function ChatWithLessor() {
  const [newMessage, setNewMessage] = useState("");
  const account = useSelector((state) => state.account);
  const [currenUser, setCurrentUser] = useState({});
  const [chatRoomList, setChatRoomList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    const getChatRoomList = async () => {
      axios
        .get(`/api/room/get-all`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          setChatRoomList(res.data);
        })
        .catch((err) => console.log(err));
    };
    getChatRoomList();
  }, [account?.token]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("aaaa");
      const { payload } = data;
      console.log("35", payload);
      setMessageList((messageList) => [payload, ...messageList]);
    });
    socket.on("connect_error", (err) => {
      console.log(err.data);
    });
    socket.on("disconnect", (reason) => {
      console.log("disconnect", reason);
    });
  }, []);
  const handleSendMessage = () => {
    const conversation = {
      content: newMessage,
      receiver_id: currenUser._id,
      sender_id: account?.accessToken?.id,
    };
    socket.emit("sendMessage", conversation);
    setNewMessage("");
    setMessageList((messageList) => [
      {
        ...conversation,
        _id: new Date().getTime() + "",
        sender_id: {
          _id: account?.accessToken?.id,
          name: account?.accessToken?.fullName,
          avatar: account?.accessToken?.avatar,
        },
        receiver_id: {
          _id: currenUser._id,
        },
      },
      ...messageList,
    ]);
  };
  useEffect(() => {
    const getAllMessage = async () => {
      axios
        .get(`/api/message/get-all/${currenUser._id}`, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          setMessageList(res.data.result);
        })
        .catch((err) => console.log(err));
    };
    getAllMessage();
  }, [account?.token, currenUser._id]);

  return (
    <div className="chatWithLessor" style={{ marginTop: "225px" }}>
      <Header />
      <div className="chatContent">
        <div className="leftChat">
          <div className="topLeftChat">
            <h3>Tin nhắn</h3>
          </div>

          <div className="bottomLeftChat">
            {chatRoomList.map((room, index) => {
              return (
                <InboxCard
                  key={index}
                  room={room}
                  setCurrentUser={setCurrentUser}
                />
              );
            })}
          </div>
        </div>

        <div className="rightChat">
          <div className="topRightChat">
            <h3 className="lessorNameChat">{currenUser?.fullName}</h3>
            <i>Thời gian phản hồi khoảng: 1 giờ</i>
          </div>
          <div className="bottomRightChat">
            <div className="chatBox">
              <div vertical className="chatMessages">
                <Messages messageList={messageList} />
              </div>
            </div>
            <div className="inputContainer">
              <div className="divSendMessage">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="inputMessage"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  className="uploadMessage"
                  style={{ opacity: newMessage === "" ? 0 : 1 }}
                  onClick={() => handleSendMessage()}
                >
                  <span>
                    <ArrowUpwardIcon />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWithLessor;
