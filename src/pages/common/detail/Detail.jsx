import './Detail.scss'
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Comment from '../../../components/component/Comment';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Detail(){
    const navigate = useNavigate();
    const [path, setPath] = useState('')
    const {pathname} = useLocation();
    const {slug} = useParams()
    const [blog, setBlog] = useState()
    const [starComment, setStarComment] = useState(0);
    const [feedback, setFeedback] = useState('')
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [hover, setHover] = useState(-1);
    const [blogRates, setBlogRates] = useState([])
    const [lessor, setLessor] = useState({})
    const account = useSelector(state => state.account)
    const [currentBlogRate, setCurrentBlogRate] = useState();
    const [isComment, setIsComment] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [sizeImage, setSizeImage] = useState();

    const handlePreviousImage = ( ) => {
         setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sizeImage - 1));
    }

    const handleForwardImage =  () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < sizeImage - 1 ? prevIndex + 1 : 0));
    }

    
    function getLabelText(value) {
      return `${value} Star${value !== 1 ? 's' : ''}`;
    }

    const handleToContact = ( ) => {
        navigate('/contact-host')   
    }
 
    useEffect(() => {
        window.scrollTo(0,0)
        axios
        .get(`/api/blog/detail/${slug}`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data
                setBlog(data);
                setSizeImage(data.image.length);
            }            
        })
        .catch(err => console.log(err))


        axios
        .get(`/api/auth/profile`,{
            headers: {
                Authorization: `Bearer ${account?.token}`
            }
        })
        .then(res => {
            setLessor(res.data.data);
        })
        .catch(err => console.log(err)) 
                
        axios
        .get(`/api/blog_rate/GetAll/${slug}`)
        .then(res => {
            const data = res.data.data.allFeedback;
            setBlogRates(data);
        })
        .catch(res => console.log(res))
    },[])


    useEffect(() => {
        axios
        .get(`/api/blog_rate/GetAll/${slug}`)
        .then(res => {
            const data = res.data.data.allFeedback;
            setBlogRates(data);
        })
        .catch(res => console.log(res))
        axios
        .get(`/api/blog/detail/${slug}`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data
                setBlog(data);
            }            
        })
        .catch(err => console.log(err))
    },[isComment])

    useEffect(() => {
        axios
        .get(`/api/blog_rate/GetAll/${slug}`)
        .then(res => {
            const data = res.data.data.allFeedback;
            setBlogRates(data);
        })
        .catch(res => console.log(res))
        axios
        .get(`/api/blog/detail/${slug}`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data
                setBlog(data);
            }            
        })
        .catch(err => console.log(err))
    },[isDelete])

    useEffect(() => {
        axios
        .get(`/api/blog_rate/GetAll/${slug}`)
        .then(res => {
            const data = res.data.data.allFeedback;
            setBlogRates(data);
        })
        .catch(res => console.log(res))
        axios
        .get(`/api/blog/detail/${slug}`)
        .then(res => {
            if(res.data.isSuccess === true){
                const data = res.data.data
                setBlog(data);
            }            
        })
        .catch(err => console.log(err))
    },[isUpdating])


    const handleDeleteComment = () => {
        setIsDelete(!isDelete)
        setIsUpdating(false);
        setStarComment(0);
        setFeedback('')
    }

    const handleComment = () => {
        if(starComment === '' || feedback === ''){
            toast.warn("Cần điền đầy đủ thông tin để bình luận!!")
        }else{
            const commentContent = {
                star: +starComment,
                title: feedback,
                blogId: slug,
                file: ['']
            }

            axios
            .post('/api/blog_rate/create', commentContent,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                setStarComment(0);
                setFeedback('');
                setIsComment(!isComment);
                toast.success('Bình luận thành công!!')
            })
            .catch(err => console.log(err))
        }
    }

    const hanldeUpdateBlogRate = (blog) =>{
        setIsUpdating(true);
        setStarComment(blog?.star);
        setFeedback(blog?.title);
        setCurrentBlogRate(blog);
    }

    const handleEdit = () => {
        if(starComment === '' || feedback ===''){
            toast.warn("vui lòng điền đầy đủ thông tin trên bình luận");
        }else{
            const editContent = {
                star: starComment,
                title: feedback,
                file: currentBlogRate?.file
            }

            axios
            .patch(`/api/blog_rate/update/${currentBlogRate?._id}`,editContent,{
                headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
            })
            .then(res => {
                if(res.data.statusCode === 200){
                    toast.success('Chỉnh sửa bình luận thành công')
                    setIsUpdating(false);
                    setFeedback('')
                    setStarComment(0)
                    setCurrentBlogRate({});
                }else{
                    toast.error("Chỉnh sửa bình luân thất bại")
                }
            })
            .catch(err => console.log(err))
        }
    }

    const handleClear = () => {
        setIsUpdating(false);
        setStarComment(0);
        setFeedback(0);
        setCurrentBlogRate({})
    }

    return (
        <div className='detail'>
            <div className='titleDetail'>
                <h2>{blog?.title}</h2>
            </div>
            <div className='thumnailImage'>
                <div className='firstCol'>
                    <img src={`http://${blog?.image[currentImageIndex]}`} alt={blog?.image[0]} />
                </div>
                {currentImageIndex!== 0 ?<ArrowBackIosRoundedIcon className='backIconDetail' onClick={() => handlePreviousImage()} />:''}
                {currentImageIndex!== sizeImage-1 ?<ArrowForwardIosRoundedIcon className='nextIconDetail' onClick={() => handleForwardImage()}/>:""}
                <div className="secondCol">
                </div>
                <div className='thirdCol'>
                     
                </div>
            </div>
            <div className='content'>
                <div className="leftContent">
                    <div className='detailContent'>
                        <div className="detailTitle">
                            <h2 className='roomName'>
                                {blog?.description}
                            </h2>
                            <i className="descriptionContent">
                                2 người ở, 1 phòng ngủ, 1 giường, 1 phòng tắm
                            </i>
                        </div>
                        <div className="favouriteRoom">
                            <div className='customerFavourite1'>
                                <svg viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="36"><g clipPath="url(#clip0_5880_37773)"><path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37773"><rect width="18.8235" height="32" fill="white" transform="translate(0.453125 0.000488281)"></rect></clipPath></defs></svg>
                                <div className='likeRoom'>
                                    <span> Được khách hàng yêu thích</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 32" fill="none" height="36"><g clipPath="url(#clip0_5880_37786)"><path fillRule="evenodd" clipRule="evenodd" d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z" fill="#222222"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z" fill="#F7F7F7"></path><path fillRule="evenodd" clipRule="evenodd" d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z" fill="#222222"></path></g><defs><clipPath id="clip0_5880_37786"><rect width="18.8235" height="32" fill="white" transform="matrix(-1 0 0 1 19.1016 0.000488281)"></rect></clipPath></defs></svg>
                            </div>
                            <div className='customerFavourite2' >
                                <span>Khách hàng đánh giá đây là một trong những ngôi nhà được yêu thích trên HolaHome</span>
                            </div>
                            <div className='customerFavourite3' >
                                <span>{blog?.avgBlogRate}</span>
                               <div className='starDetail'>
                                   <StarIcon  className='starCard'/>
                                   <StarIcon  className='starCard'/>
                                   <StarIcon  className='starCard'/>
                                   <StarIcon  className='starCard'/>
                                   <StarIcon  className='starCard'/>
    
                               </div>
                            </div>
                            <div className='customerFavourite4' >
                                <span>{blogRates?.length}</span>
                                <u>đánh giá</u>
                            </div>
                        </div>
                    </div>
                    <div className='lessorBlog'>
                        <div className="lessor">
                            <div className='avatar'>
                                <AccountCircleIcon/>
                            </div>
                            <div className="detailLessor">
                                <p className="establish">
                                    Chủ nhà/Người tổ chức: {lessor?.fullName}
                                </p>
                                <i className='experience'>
                                    Chủ nhà siêu cấp 6 năm kinh nghiệm đón tiếp khách
                                </i>
                            </div>
                        </div>
                        <div className="bottomLessorBlog">
                            <h2 className='place'>Nơi bạn sẽ ngủ nghỉ</h2>
                            <div className="roomDescription">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M28 4a2 2 0 0 1 2 1.85v7.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H2v2H0v-9.68a3 3 0 0 1 .09-.71l.06-.23L2 13.84V6a2 2 0 0 1 1.7-1.98l.15-.01L4 4zm2 18H2v4h28zm-1.39-6H3.4l-1.34 4h27.9zM28 6H4v8h2v-4a2 2 0 0 1 1.85-2H24a2 2 0 0 1 2 1.85V14h2zm-13 4H8v4h7zm9 0h-7v4h7z"></path></svg>
                                <b>Phòng ngủ</b>
                                <p>1 giường </p>
                            </div>
                        </div>
                        <div className="convenience">
                            <h2>Nơi này có những gì cho bạn</h2>
                            <div className="equipments">
                                <div className="equipment">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z"></path></svg>
                                    <i className='nameEquipment'>Wi-fi</i>
                                </div>
                                <div className="equipment">
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z"></path></svg>
                                    <i className='nameEquipment'>Chỗ đỗ xe miễn phí tại nơi ở</i>
                                </div>
                                <div className="equipment">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M23 1a2 2 0 0 1 2 1.85V19h4v2h-2v8h2v2H3v-2h2v-8H3v-2h4V3a2 2 0 0 1 1.85-2H9zM9 21H7v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm4 0h-2v8h2zm-10-8H9v6h6zm8 0h-6v6h6zM15 3H9v8h6zm8 0h-6v8h6z"></path></svg>
                                    <i className='nameEquipment'>Sân hoặc ban công</i>
                                </div>
                                <div className="equipment">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 24, width: 24, fill: 'currentcolor'}}><path d="M25 1a2 2 0 0 1 2 1.85V29a2 2 0 0 1-1.85 2H7a2 2 0 0 1-2-1.85V3a2 2 0 0 1 1.85-2H7zm0 10H7v18h18zm-15 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM25 3H7v6h18zM10 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                                    <i className='nameEquipment'>Tủ lạnh</i>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightCotent">

                </div>
            </div>
            <div className="ratingBlog">
                <div className="numberStar">
                    <img className="i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" decoding="async" elementtiming="LCP-target" src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg" data-original-uri="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg" style={{objectFit: 'cover'}}></img>
                    <b className='starRating'>{blog?.avgBlogRate.toFixed(1)}</b>
                    <img className="i9if2t0 atm_e2_idpfg4 atm_vy_idpfg4 atm_mk_stnw88 atm_e2_1osqo2v__1lzdix4 atm_vy_1osqo2v__1lzdix4 atm_mk_pfqszd__1lzdix4 i1cqnm0r atm_jp_pyzg9w atm_jr_nyqth1 i1de1kle atm_vh_yfq0k3 dir dir-ltr" aria-hidden="true" decoding="async" elementtiming="LCP-target" src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg" data-original-uri="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg" style={{objectFit: 'cover'}}></img>
                </div>
                <div className="ratingTitle">
                    <span>Được khách yêu thích</span>
                    <i className='titleDes'>Một trong những ngôi nhà được yêu thích nhất trên HolaRent dựa trên điểm xếp hạng, đánh giá và độ tin cậy</i>
                </div>
            </div>
            {(account?.phone !== undefined || isUpdating === true) ?
                <div className="commentAction">
                    <div className="avatarCommentAction">
                        <AccountCircleIcon/>
                    </div>
                    <div className="detailCommentAction">
                            <div className="ratingStarCommentAction">
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    >
                                    <Rating
                                        name="hover-feedback"
                                        value={starComment}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setStarComment(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    
                                </Box>
                            </div>
                            <textarea 
                                className="inputComment" 
                                cols="30" rows="10"
                                placeholder='Viết Bình Luận'
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                ></textarea>
                            <div className='btnComment'>
                                {isUpdating === true ?<span className='clearIcon' onClick={() => handleClear()}><ClearIcon/></span>:''}
                                <i 
                                    type='submit'
                                    className='btnCommentAction' 
                                    onClick={isUpdating === true ? () => handleEdit() : () => handleComment()}
                                    onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                e.preventDefault(); 
                                                handleComment();
                                                }
                                            }}
                                >
                                    {isUpdating === true ?'Chỉnh sửa' : 'Bình Luân'}
                                </i>
                            </div>
                    </div>
                </div>:<></>
            }

            <div className="comments">
                {blogRates?.map(blog => { 
                    if(blog?._id !== currentBlogRate?._id)
                    return <Comment 
                                key={blog?._id} 
                                content={blog} 
                                onDelete={handleDeleteComment} 
                                onUpdate={() => hanldeUpdateBlogRate(blog)} 
                            />
                })}
            </div>

            <div className="mapDetail">
                <h2 className="titleMap">
                    Nơi bạn sẽ đến
                </h2>
                <iframe className='mapImage' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.503215788895!2d105.52278657495464!3d21.012541880632742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1705049670971!5m2!1svi!2s" width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <span className='placeName'>Hoà Lạc, Hà Nội</span>
                <p className='placeDescription'>The Boot nằm ở vị trí lý tưởng để khám phá Vườn quốc gia Abel Tasman, các nhà máy rượu vang, bãi biển và Vườn quốc gia Kahurangi. Chúng tôi cũng gần thị trấn Motueka và làng Mapua.</p>
            </div>
            <div className="detailLessor">
                <div className="topDetailLessor">
                    <div className="lessor">
                        <div className='avatar'>
                            <AccountCircleIcon/>
                        </div>
                        <div className="detailLessorTop">
                            <p className="establish">
                                Chủ nhà/Người tổ chức: {lessor?.fullName}
                            </p>
                            <i className='experience'>
                            Chủ nhà siêu cấp 6 năm kinh nghiệm đón tiếp khách
                            </i>
                        </div>
                    </div>
                </div>

                <div className="bottomDetailLessor">
                    <div className="leftBottomDetailLessor">
                        <div className="ratingLessor">
                            <div className="numberRatingLessor">
                                <StarIcon  className='starCard'/>
                                <span>{blogRates?.length} đánh giá</span>
                            </div>
                            <div className="authenLessor">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: 16, width: 16, fill: 'currentcolor'}}><path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm7 9.08-9.5 9.5-4.5-4.5L6.88 17l6.62 6.62L25.12 12 23 9.88z"></path></svg>
                                <span>Đã xác minh danh tính</span>
                            </div>
                        </div>
                        <div className="lessorDescription">
                            <p>Tôi là một người pahadi địa phương, đam mê cung cấp cho du khách trải nghiệm Himachali khao khát. Tôi là một giáo viên chuyên nghiệp và thích gặp gỡ những người mới từ khắp nơi trên thế giới.</p>
                        </div>
                    </div>
                    <div className="rightBottomDetailLessor">
                        <i><b>Ngôn ngữ:</b> Tiếng Việt</i>
                        <i><b>Tỉ lệ phản hồi:</b> 100%</i>
                        <i><b>Thời gian phản hồi:</b> trong vòng một giờ</i>
                        <button className='contactLessor' onClick={() => handleToContact()}>
                            Liên hệ với chủ nhà
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Detail