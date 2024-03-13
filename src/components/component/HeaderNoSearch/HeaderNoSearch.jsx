import { useLocation, useNavigate } from 'react-router'
import './HeaderNoSearch.scss'
import { useEffect, useState } from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HeaderNoSearch() {
    const navigate = useNavigate();
    const [showRegister, setShowRegister] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [path, setPath] = useState('')
    const { pathname } = useLocation();

    useEffect(() => {
        localStorage.setItem('path', pathname);
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const scrollThreshold = 100;
            setIsScrolled(scrollTop > scrollThreshold);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    const handleToLogin = () => {
        navigate('/login')
        setPath(pathname)
    }

    return (
        <div className="headerNoSearch">
            <div className='header'>
                <div className='nav'>
                    <div className='logoHeader' onClick={() => { navigate("/") }}>
                        <img src="https://res.cloudinary.com/dggciohw8/image/upload/v1705070813/417012680_904990781626845_39715534048793428_n_zj9jly.png" alt="" />
                    </div>
                    <div className='action' onClick={() => setShowRegister(!showRegister)}>
                        <div className='borderAction'>
                            <ReorderIcon />
                            <div className='userAvatar'>
                                <AccountCircleIcon />
                            </div>
                        </div>
                        {showRegister === true ?
                            <div className='inforNav'>
                                <div className='loginNav'>
                                    <ul>
                                        <li onClick={() => navigate("/register")}><span className='register'>Đăng ký</span></li>
                                        <li onClick={() => handleToLogin()}><span>Đăng nhập</span></li>
                                        <li onClick={() => navigate('/inbox')}><span>Tin nhắn</span></li>
                                        <li onClick={() => navigate('/wishlist')}><span>Danh sách yêu thích</span></li>
                                        <li onClick={() => navigate('/admin/dashboard')}><span>Dashboard</span></li>
                                        <li onClick={() => navigate('/profile')}><span>Profile</span></li>
                                    </ul>
                                </div>
                            </div> : <></>}
                    </div>


                </div>

            </div>
        </div>
    )
}

export default HeaderNoSearch