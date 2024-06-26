import { useNavigate } from "react-router";
import "./Register.scss";
import { useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";

function Register() {
  const [role, setRole] = useState("renter");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!phone || !password || !confirmPassword || !fullName) {
      toast.warning("Bạn chưa điền đẩy đủ thông tin");
    } else if (password !== confirmPassword) {
      toast.warning("Mật khẩu không trùng nhau");
    } else if (password.length < 6) {
      toast.warning("Mật khẩu phải tối thiểu 6 kí tự");
    } else {
      //   setIsLoading(false);
      const userRegister = {
        fullName: fullName,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
      };
      axios
        .post("http://localhost:9999/api/auth/register", userRegister)
        .then((res) => {
          console.log("re", res.data);
          if (res.data.message === "Phone number already exists") {
            toast.error("Số điện thoại đã tồn tại trong hệ thống");
            setIsLoading(true);
          } else {
            toast.success("Bạn đã đăng kí thành công");
            setIsLoading(true);
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log("err: ", err);
          if (err.response.data.statusCode == 400) {
            toast.error(err.response.data.message[0])
          } else {
            toast("Đã có lỗi xảy ra, bạn kiểm tra thông tin cho đúng")
          }
        }
        );
    }
  };

  return isLoading ? (
      <div className="loginPage">
        <div className="containerLogin">
          <div className="loginContent">
            <div className="leftContent">
              <img
                src="https://res.cloudinary.com/dggciohw8/image/upload/v1705079434/20_French_Country-Style_Homes_with_European_Elegance_lhby5k.jpg"
                alt=""
              />
              {/* <span
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                <ArrowBackIosRoundedIcon className="backIconLogin" />
              </span> */}
              <div className="detailLeftContent">
                <div className="signInLeft">
                  <h1>Sign Up</h1>
                </div>
                <div className="privacy">
                  <h2>Privacy policy {"&"} Term of service</h2>
                </div>
              </div>
            </div>
            <div className="rightContent">
              <form onSubmit={handleSignUp}>
                <div className="input">
                  <label htmlFor="fullName">Tên: </label>
                  <input
                    placeholder="Họ và tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                  />
                </div>
                <div className="input">
                  <label htmlFor="phone">Số điện thoại: </label>
                  <input
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                  />
                </div>
                <div className="input">
                  <label htmlFor="password">Mật khẩu:</label>
                  <input
                    placeholder="Mật khẩu"
                    type={"password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input">
                  <label htmlFor="confirmPassword">Mật khẩu xác nhận:</label>
                  <input
                    placeholder="Mật khẩu xác nhận"
                    type={"password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="input">
                  <label>Role:</label>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="renter"
                        checked={role === "renter"}
                        onChange={() => setRole("renter")}
                      />
                      Renter
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="lessor"
                        checked={role === "lessor"}
                        onChange={() => setRole("lessor")}
                      />
                      Lessor
                    </label>
                  </div>
                </div>
                <div className="handle">
                   <div className="handleBox">
                     <span
                     className="backToLoginR"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Quay lại
                    </span>
                    <button
                      type="submit"
                      // onClick={() => {
                      //   handleSignUp();
                      // }}
                    >
                      Đăng ký
                    </button>
                   </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  ) : (
    <Loading />
  );
}

export default Register;
