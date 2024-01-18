import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import "./Login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const pathBack = localStorage.getItem('pathDetail');


  return (
   
     <div className="loginPage">
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
                        <label htmlFor="mail">Username: </label>
                        <input
                            placeholder="Enter Username "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="mail"
                        />
                        </div>
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
                        <p
                        style={{
                            color: "#f9004d",
                            textAlign: "left",
                            fontSize: "12px",
                            display: "none",
                        }}
                        >
                        Incorrect Email or Password
                        </p>
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
                        <button className="signUpBtn">Login</button>
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
     </div>
  );
}

export default Login