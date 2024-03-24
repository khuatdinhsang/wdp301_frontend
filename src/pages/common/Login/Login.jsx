import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import "./Login.scss";
import { toast } from "react-toastify";
import { loginAccount, logout } from "../../../actions/accountActions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { pathBackViewProfile } from "../../../actions/pathActions";
import { showAds } from "../../../actions/bannerActions";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const pathBack = useSelector((state) => state.path);
  const [warningUsername, setWarningUsername] = useState(false);
  const [isBlankPassword, setIsBlankPassword] = useState(false);

  useEffect(() => {
    username % 1 == 0 ? setWarningUsername(false) : setWarningUsername(true);
  }, [username]);

  useEffect(() => {
    password.trim() === ""
      ? setIsBlankPassword(true)
      : setIsBlankPassword(false);
  }, [password]);

  const handleLogin = (e) => {
    if (username.trim() === "" || username.trim() % 1 !== 0) {
      toast.warn("Số điện thoại không đúng");
    } else if (password.trim() === "") {
      toast.warn("Mật khẩu không được để trống!");
    } else {
      e.preventDefault();
      const userLogin = {
        phone: username.trim(),
        password: password.trim(),
      };
      axios
        .post("/api/auth/login", userLogin)
        .then((res) => {
          const data = res.data;
          if (data.statusCode === 200) {
            const account = jwt_decode(res.data.data.accessToken);
            const user = {
              phone: username.trim(),
              accessToken: account,
              token: res.data.data.accessToken,
              role: account.role,
              avatar: account?.avatar,
            };
            console.log(user);
            const action = loginAccount(user);
            // setIsLoading(true);
            dispatch(action);
            const action1 = showAds(true);
            dispatch(action1);
            if (pathBack === false || pathBack === "") {
              if (account.role === "renter") {
                navigate("/");
              } else if (account.role === "lessor") {
                navigate("/lessor/blogManager");
              } else if (account.role === "admin") {
                navigate("/admin/dashboard");
              }
            } else {
              navigate(pathBack);
              const action = pathBackViewProfile("");
              dispatch(action);
            }
            toast.success("Đăng nhập thành công!");
          } else if (data.statusCode === 500) {
            if (data.message === "Phone number does not exist") {
              toast.warn("Số điện thoại chưa được đăng ký");
            } else if (data.message === "Password is invalid") {
              toast.warn("Mật khẩu không đúng");
            }
          }
        })
        .catch((err) => console.log(err));
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
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              <ArrowBackIosRoundedIcon className="backIconLogin" />
            </span>
            <div className="detailLeftContent">
              <div className="signInLeft">
                <h1>Sign In</h1>
              </div>
              <div className="privacy">
                <h2>Privacy policy {"&"} Term of service</h2>
              </div>
            </div>
          </div>
          <div className="rightContent">
            <form onSubmit={handleLogin}>
              <div className="input">
                <label htmlFor="mail">Phone Number: </label>
                <input
                  placeholder="Phone "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="mail"
                />
              </div>
              <p
                style={{
                  color: "#f9004d",
                  textAlign: "left",
                  fontSize: "12px",
                  display: warningUsername ? "block" : "none",
                }}
              >
                Số điện thoại phải là số
              </p>
              <div className="input">
                <label htmlFor="password">Password:</label>
                <input
                  placeholder="Password"
                  type={"password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
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
              <p
                style={{
                  color: "#f9004d",
                  textAlign: "left",
                  fontSize: "12px",
                  display: "none",
                }}
              >
                Account is Blocked
              </p>
              <div className="handle">
                <button
                  className="signUpBtn"
                  type='submit'
                  // onClick={() => handleLogin()}
                  // onKeyPress={(e) => {
                  //   if (e.key === "Enter") {
                  //     e.preventDefault();
                  //     handleLogin();
                  //   }
                  // }}
                >
                  Login
                </button>

                {/* <i
                  className="remember"
                  onClick={() => navigate("/forgotPassword")}
                >
                  Forgot Password
                </i> */}
              </div>
            </form>
            <div className="register">
              <b>You don't have an account? </b>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Login;
