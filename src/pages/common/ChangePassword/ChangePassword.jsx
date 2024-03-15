import { useState } from "react";
import { useNavigate } from "react-router";
import "./ChangePassword.scss";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function ChangePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const account = useSelector((state) => state.account);

  const handleChangePassword = () => {
    if (password === "" || newPassword === "" || confirmNewPassword === "") {
      toast.warn("Vui lòng nhập đầy đủ thông tin");
    } else if (newPassword !== confirmNewPassword) {
      toast.warn("Xác nhận mật khẩu mới sai");
    } else {
      const passChange = {
        currentPassword: password,
        newPassword: newPassword,
      };

      axios
        .post("/api/auth/changePassword", passChange, {
          headers: {
            Authorization: `Bearer ${account?.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data.isSuccess === true) {
            toast.success("Đổi mật khẩu thành công");
            navigate("/");
          } else {
            toast.error("Đổi mật khẩu thất bại");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="loginPage">
      <div className="containerLogin">
        <div className="loginContent">
          <div className="leftContent">
            <img
              src="https://res.cloudinary.com/dggciohw8/image/upload/v1705079434/20_French_Country-Style_Homes_with_European_Elegance_lhby5k.jpg"
              alt=""
            />
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <ArrowBackIosRoundedIcon className="backIconLogin" />
            </span>
            <div className="detailLeftContent">
              <div className="signInLeft">
                <h1>Change Password</h1>
              </div>
              <div className="privacy">
                <h2>Privacy policy {"&"} Term of service</h2>
              </div>
            </div>
          </div>
          <div className="rightContent">
            <form>
              <div className="input">
                <label htmlFor="mail">Old Password: </label>
                <input
                  placeholder="Old Password"
                  id="mail"
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <p
                                style={{
                                    color: "#f9004d",
                                    textAlign: "left",
                                    fontSize: "12px",
                                    // display: warningUsername ? "block" : "none",
                                }}
                            >
                                Số điện thoại phải là số
                            </p> */}
              <div className="input">
                <label htmlFor="password">New Password:</label>
                <input
                  placeholder="New Password"
                  type={"password"}
                  id="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="password1">Confirm New Password:</label>
                <input
                  placeholder="Confirm newPassword"
                  type={"password"}
                  id="password1"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {/* <p
                            style={{
                                color: "#f9004d",
                                textAlign: "left",
                                fontSize: "12px",
                                display: isBlankPassword?"block":"none",
                            }}
                            >
                            Mật khẩu đang được để trống
                            </p> */}
              <div className="handle">
                <span
                  className="signUpBtn"
                  onClick={() => handleChangePassword()}
                  // onKeyDown={(e) => {
                  //     if (e.key === 'Enter') {
                  //         e.preventDefault();
                  //         handleChangePassword()
                  //     }
                  // }}
                >
                  Confirm
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
