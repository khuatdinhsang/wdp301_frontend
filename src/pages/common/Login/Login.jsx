
import "./Login.scss"
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from "react-router";


function Login(){
    const navigate = useNavigate();
    const pathBack = localStorage.getItem('path');

    return (
        <div className="loginPage">
            <div className="leftLogin">
                <img className="imgLeftLogin" src="https://a0.muscache.com/im/pictures/62aa6971-79d5-4b75-acea-e53de37455bc.jpg?im_w=720" alt="" />
                <div className="contentLeftLogin">
                    <h4>Turn Your Ideas into reality</h4>
                    <u>Start for free and get attractive for offers from the community</u>
                </div>
                <span onClick={() => navigate(pathBack)}><ArrowBackIosRoundedIcon className='backIconLogin' /></span>

            </div>
            <div className="rightLogin">
                <div className="contentRightLogin">
                    <div className="titleRightLogin">
                        <h5>HOLA HOME</h5>
                    </div>
                    <div className="notifyRightLogin">
                        <h5>Login</h5>
                        <p>Welcome Back! Please enter your details</p>
                    </div>
                    <div className="inputRightLogin">
                        <input type="text" className="inputLogin" placeholder="Email"/>
                        <input type="password" className="inputLogin" placeholder="Password"/>
                    </div>
                    <div className="rememberMe">
                        <div className="leftRememberMe">
                            <input type="checkbox" className="rememberCheckbox" />
                            <span>Remmember me for 30 days</span>
                        </div>
                        <div className="rightRememberMe">
                            <u>Forgot Password?</u>
                        </div>
                    </div>
                    <div className="loginBtnRightLogin">
                        <button className="loginBtn">Log in</button>
                    </div>
                    <div className="registerRightLogin">
                        <button className="loginRegister">Register</button>
                    </div>
                    <div className="loginGoogleRightLogin">
                        <button className="loginGoogleBtn">Sign Up With Google</button>
                    </div>
                    <div className="signUpRightLogin">
                        <i>Don't have an account?</i>
                        <u className="freeSignUp">Sign up for free</u>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login