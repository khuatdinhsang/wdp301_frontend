import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import "./Login.scss";
import { toast } from "react-toastify";
import { loginAccount, logout } from "../../../actions/accountActions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loading from "../Loading";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const pathBack = localStorage.getItem('pathDetail');
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const [warningUsername, setWarningUsername] = useState(false)
    const [isBlankPassword, setIsBlankPassword] = useState(false)

    useEffect(() => {
        username % 1 == 0 ? setWarningUsername(false) : setWarningUsername(true)
    },[username])

    useEffect(() => {
        password.trim() === '' ? setIsBlankPassword(true) : setIsBlankPassword(false)
    },[password])

    const handleLogin = () => {
        if(username.trim() === '' || username.trim() % 1 !== 0){
            console.log("Số điện thoại không đúng");
        }else if(password.trim() === ''){
            console.log("Mật khẩu đang để trống");
        }else{
            const userLogin = {
                phone: username.trim(),
                password: password.trim()
            }        
            axios
            .post("/api/auth/login", userLogin)
            .then(res => {
                if(res.data.isSuccess === true){
                    const account = jwt_decode(res.data.data.accessToken);

                    const user = {
                        phone: username.trim(),
                        accessToken: account,
                        token: res.data.data.accessToken
                    }

                    const action = loginAccount(user);
                    setIsLoading(true);
                    dispatch(action);
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
        }
    }


    return (
    
        isLoading ?<div className="loginPage">
            <div className="containerLogin">
                <div className="loginContent">
                    <div className="leftContent">
                    
                        <img
                            src="https://res.cloudinary.com/dggciohw8/image/upload/v1705079434/20_French_Country-Style_Homes_with_European_Elegance_lhby5k.jpg"
                            alt=""
                        />
                        <span style={{cursor: "pointer"}} onClick={() => navigate(pathBack)}><ArrowBackIosRoundedIcon className='backIconLogin' /></span>
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
                        <form>
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
                                display: warningUsername? "block" : "none",
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
                            <span 
                                className="signUpBtn"
                                onClick={() => handleLogin()}
                                onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault(); 
                                          handleLogin();
                                        }
                                      }}
                            >
                                    Login
                            </span>
                            <i className="remember" style={{ textAlign: "center" }} >
                                Change Password
                            </i>
                            <i className="remember" onClick={() => navigate("/forgotPassword")}>Forgot Password</i>
                            </div>
                        </form>
                        <div className="register">
                            <b>You don't have an account? </b>
                            <p
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate('/register')}
                            >
                            Register
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>: <Loading/>
    );
}

export default Login