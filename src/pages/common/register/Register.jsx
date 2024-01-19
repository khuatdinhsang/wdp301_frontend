import { useNavigate } from 'react-router'
import './Register.scss'
import { useState } from 'react'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from "axios"
import { toast } from "react-toastify"
import Loading from "../Loading"

function Register() {
    const [role, setRole] = useState("renter");
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const handleSignUp = () => {
        if (!phone || !password || !confirmPassword || !fullName) {
            toast.warning("Have a blank information")
        } else if (password !== confirmPassword) {
            toast.warning("Password is not match Confirm Password")
        } else {
            setIsLoading(false)
            const userRegister = {
                fullName: fullName,
                phone: phone,
                password: password,
                confirmPassword: confirmPassword,
                role: role
            }
            axios
                .post("http://localhost:9999/api/auth/register", userRegister)
                .then((res) => {
                    if (res.data.status === "ERR") {
                        toast.error("phone already exists!")
                        setIsLoading(true)
                    } else {
                        toast.success("Create account successfully")
                        setIsLoading(true)
                        navigate("/login")
                    }
                })
                .catch(err => toast(err))
        }
    }

    return (
        isLoading ? <div className="container">
            <div className='registerPage'>
                <div className="container">
                    <div className="loginContent">
                        <div className="leftContent">
                            <img src="https://res.cloudinary.com/dggciohw8/image/upload/v1705079434/20_French_Country-Style_Homes_with_European_Elegance_lhby5k.jpg" alt="" />
                            <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}><ArrowBackIosRoundedIcon className='backIconLogin' /></span>
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
                            <div className="input">
                                <label htmlFor="fullName">FullName: </label>
                                <input
                                    placeholder="Enter your full name:  "
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    id="fullName"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="phone">Phone: </label>
                                <input
                                    placeholder="Enter Username "
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    id="phone"
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="password">Password:</label>
                                <input
                                    placeholder="Password"
                                    type={"password"}
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    placeholder="Confirm Password"
                                    type={"password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
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
                                <button onClick={() => { handleSignUp() }}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> : <Loading />
    )
}

export default Register