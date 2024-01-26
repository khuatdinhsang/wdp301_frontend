import './style.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Card({blog}){
    const navigate = useNavigate()
    const [status, setStatus] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [sizeImage, setSizeImage] = useState(blog?.image.length);
    const account = useSelector(state => state.account);

    const handlePreviousImage = ( ) => {
         setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sizeImage - 1));
    }

    const handleForwardImage =  () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < sizeImage - 1 ? prevIndex + 1 : 0));
    }

    const handleFavouriteRoom = () => {
        setStatus(!status)
        const blogFavorite = {
            id: blog?._id
        }
        axios
        .post("/api/auth/blog/favorite", blogFavorite, {
            headers: {
                        Authorization: `Bearer ${account?.token}`
                    }
        })
        .then(res => {
            console.log(account);
        })
        .catch(err => console.log(err))
        
    }
    return (
        <div className='card' >
            {blog?.title?<><div className='imageContainer' onClick={() => navigate(`/detail/${blog?._id}`)}>
                <img alt='' src={blog?.image[currentImageIndex]}/>
            </div>
            <ArrowBackIosRoundedIcon className='backIcon' onClick={() => handlePreviousImage()}/>
            <ArrowForwardIosRoundedIcon className='nextIcon' onClick={() => handleForwardImage()}/>
            <div className='infoCard'>
                <div className='titleRow'>
                    <h2 className='titleCard'>{blog?.title}</h2>
                    <div className='showStar'>
                        <StarIcon  className='starCard'/>
                        <span className='numberStarCard'> 5,0</span>
                    </div>
                </div>
                <span className='dateBuilding'>{blog?.description}</span>
                <p className='priceCard'><span className='pricePer'>{blog?.money?.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span> / tháng</p>
            </div>
            <FavoriteIcon className='heartCard' style={{color: status===true?'':'pink'}} onClick={() => handleFavouriteRoom()}/>
            <div className='favouriteChoosen'><span>Được khách yêu thích</span></div></>:<></>}
        </div>

    )
}

export default Card