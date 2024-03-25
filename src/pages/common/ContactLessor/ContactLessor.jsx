import { useNavigate, useParams } from "react-router";
import "./ContactLessor.scss";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { socket } from "../../../utils";

function ContactLessor() {
  const navigate = useNavigate();
  const pathBack = useSelector((state) => state.path);
  const account = useSelector((state) => state.account);
  const { slug } = useParams();
  const [userDetail, setUserDetail] = useState();
  const [content, setContent] = useState("");
  console.log("user", userDetail);
  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`/api/auth/getProfileUserOther/${slug}`, {
        headers: {
          Authorization: `Bearer ${account?.token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (res.data.isSuccess === true) {
          setUserDetail(data);
        } else {
          toast.warn("Có vấn đề khi tải thông tin người dùng!");
        }
      })
      .catch((err) => console.log(err));
  }, [slug]);
  const handleSendMessage = () => {
    axios
      .post(
        `/api/room/create`,
        { users: [account?.accessToken?.id, userDetail?._id] },
        {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.users?.length > 0) {
          const conversation = {
            content: content,
            receiver_id: userDetail?._id,
            sender_id: account?.accessToken?.id,
          };
          socket.emit("sendMessage", conversation);
          setContent("");
          navigate("/inbox");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="contactLessor">
      <div className="backIconContact">
        <span style={{ cursor: "pointer" }} onClick={() => navigate(pathBack)}>
          <ArrowBackIosRoundedIcon className="backIconLogin" />
        </span>
      </div>
      <div className="container">
        <div className="hostTitle">
          <div className="leftHostTitle">
            <h2 className="hostName">Liên hệ {userDetail?.fullName}</h2>
            <i>Thường phản hồi trong vòng 1 giờ</i>
          </div>
          <div className="rightHostTitle">
            <img
              className="imgHost i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr"
              aria-hidden="true"
              alt="Satish là chủ nhà siêu cấp. Tìm hiểu thêm về Satish."
              decoding="async"
              elementtiming="LCP-target"
              src={`http://${userDetail?.avatar}`}
              data-original-uri="https://a0.muscache.com/im/pictures/user/8c2644b3-c718-46bb-bd79-d4803a56393f.jpg?im_w=240"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="aboutRenter">
          <div className="aboutStudent">
            <h3>Hầu hết sinh viên đều quan tâm</h3>
          </div>
          <div className="priceAndPrivacy">
            <h4>Đi tới đó</h4>
            <ul>
              <li>Chỗ đỗ xe miễn phí, an toàn.</li>
            </ul>
          </div>
          <div className="priceAndPrivacy">
            <h4>Giá cả và tình trạng còn phòng</h4>
            <ul>
              <li>Giá cả được niêm yết, làm việc rõ ràng trong hợp đồng.</li>
              <li>
                Hoàn tiền hợp đồng đầy đủ khi hoàn thành thời gian hợp đồng
              </li>
            </ul>
          </div>
        </div>
        <div className="questionForHost">
          <h2>Bạn vẫn còn thắc mắc? Nhắn tin cho chủ nhà</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="question"
            cols="20"
            rows="5"
          ></textarea>
          <button className="sendQuestion" onClick={() => handleSendMessage()}>
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactLessor;
